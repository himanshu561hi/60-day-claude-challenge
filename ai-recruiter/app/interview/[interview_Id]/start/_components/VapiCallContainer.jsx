'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  PhoneCall, 
  PhoneOff, 
  Bot, 
  User, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  RefreshCw,
  Terminal,
  Clock,
  Radio,
  Sliders,
  ShieldCheck,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  Brain,
  Target,
  Activity,
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';

/**
 * app/interview/[interview_Id]/start/_components/VapiCallContainer.jsx
 *
 * Day 7 / Day 57: Real-Time Vapi Voice Calling Engine, Live Transcription & Dynamic AI Mentor Tips
 *
 * Responsibilities:
 * 1. Reads candidate profile and custom Gemini AI instructions from sessionStorage (`active_vapi_session`).
 * 2. Initializes @vapi-ai/web cloud voice SDK or high-fidelity Voice Simulation mode if keys aren't set.
 * 3. Handles hardware microphone audio permissions, FFT frequency analysis, and visual speech bars.
 * 4. Subscribes to active transcript streaming events and displays an animated, auto-scrolling conversation timeline.
 * 5. Integrates debounced real-time API calls to `/api/ai-feedback` to serve live AI mentor coaching tips, speech clarity scores, tone metrics, and probing angles on the sliding dashboard sidebar.
 * 6. Safely handles call termination and stores historical dialogue logs into browser session memory (`completed_interview_transcript`) for upcoming evaluations.
 */
export default function VapiCallContainer({ interviewId }) {
  const router = useRouter();
  
  // Session State
  const [sessionData, setSessionData] = useState(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Calling & Audio State
  const [callStatus, setCallStatus] = useState('idle'); // 'idle' | 'connecting' | 'active' | 'ended'
  const [activeSpeaker, setActiveSpeaker] = useState(null); // 'ai' | 'candidate' | null
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0); // seconds
  const [engineMode, setEngineMode] = useState('cloud'); // 'cloud' | 'simulation'
  
  // Conversational Timeline Messages
  const [messages, setMessages] = useState([]);
  const [simulatedTurnIndex, setSimulatedTurnIndex] = useState(0);
  const transcriptEndRef = useRef(null);
  
  // Day 7: Live AI Mentor & Speech Coaching State
  const [mentorFeedback, setMentorFeedback] = useState({
    suggestion: 'Initiating real-time voice intelligence... Start speaking to receive dynamic evaluation guidance.',
    tone: 'Monitoring Speech...',
    topics: ['System Architecture', 'Core Competencies'],
    clarity_score: 90,
    next_angle: 'Awaiting opening conversational exchange.',
    isUpdating: false,
    turnCount: 0
  });
  const feedbackTimeoutRef = useRef(null);

  // References for Web Audio & SDK
  const vapiRef = useRef(null);
  const audioStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);
  
  const MAX_CALL_DURATION = 420; // 7 Minutes maximum limit

  // Auto-scroll transcript on new messages
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, mentorFeedback]);

  // 1. Load Session on Mount & Check Environment Engine Mode
  useEffect(() => {
    // Check if live Vapi Public Key exists in environment variables
    const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    const hasValidVapiKey = vapiPublicKey && vapiPublicKey !== 'YOUR_VAPI_PUBLIC_KEY_HERE' && vapiPublicKey.trim() !== '';
    
    if (!hasValidVapiKey) {
      setEngineMode('simulation');
    } else {
      setEngineMode('cloud');
      // Dynamically load & initialize Vapi SDK when key exists
      import('@vapi-ai/web').then((VapiModule) => {
        try {
          const Vapi = VapiModule.default || VapiModule;
          vapiRef.current = new Vapi(vapiPublicKey);
          setupVapiEventListeners();
        } catch (err) {
          console.error('Failed to initialize @vapi-ai/web SDK, switching to simulation mode:', err);
          setEngineMode('simulation');
        }
      }).catch((err) => {
        console.error('Vapi module load error, switching to simulation:', err);
        setEngineMode('simulation');
      });
    }

    // Retrieve active session generated on Day 5
    try {
      const storedSession = sessionStorage.getItem('active_vapi_session');
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        setSessionData(parsed);
      } else {
        // Fallback demo profile so developer QA testing never throws dead 404 errors
        setSessionData({
          interviewId: interviewId || 'demo-interview-id',
          candidateName: 'Alex Mercer (Demo Profile)',
          candidateEmail: 'alex.mercer.dev@example.com',
          jobRole: 'Senior Full-Stack AI Engineer',
          aiPrompt: `You are Alex, an expert AI Recruiter conducting a preliminary technical voice evaluation for a Senior Full-Stack AI Engineer role. Ask thoughtful, concise questions regarding Next.js 15, React 19, Google Gemini AI, and Supabase architecture. Keep responses conversational, encouraging, and under 30 words per turn.`,
          analysis: {
            matchedSkills: ['Next.js 15', 'React 19', 'Google Gemini AI', 'Tailwind CSS v4', 'Supabase'],
            experienceLevel: 'Senior Executive (6-8+ Years)',
            interviewFocus: [
              'Architectural design patterns with Next.js App Router and serverless endpoints.',
              'Implementing generative AI pipelines with prompt engineering and low-latency token streaming.',
              'Database row level security (RLS) and real-time state management.'
            ]
          }
        });
      }
    } catch (e) {
      console.error('Error parsing session storage:', e);
    } finally {
      setIsLoadingSession(false);
    }

    // Cleanup audio resources and debouncing timers on unmount
    return () => {
      stopAudioMonitoring();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (vapiRef.current) {
        try { vapiRef.current.stop(); } catch (e) {}
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  // Setup Vapi Web SDK event subscribers
  const setupVapiEventListeners = () => {
    if (!vapiRef.current) return;

    vapiRef.current.on('call-start', () => {
      setCallStatus('active');
      startCallTimer();
      addLogMessage('system', 'Vapi cloud speech connection established. AI interviewer audio ready.');
    });

    vapiRef.current.on('call-end', () => {
      setCallStatus('ended');
      stopCallTimer();
      stopAudioMonitoring();
      addLogMessage('system', 'Voice interview concluded cleanly by caller or session limit.');
    });

    vapiRef.current.on('speech-start', () => {
      setActiveSpeaker('ai');
    });

    vapiRef.current.on('speech-end', () => {
      setActiveSpeaker('candidate');
    });

    vapiRef.current.on('volume-level', (volume) => {
      setVolumeLevel(Math.min(100, Math.floor(volume * 100)));
    });

    vapiRef.current.on('message', (message) => {
      if (message.type === 'transcript' && message.transcript) {
        const role = message.role === 'assistant' ? 'ai' : 'candidate';
        addLogMessage(role, message.transcript);
        
        // Day 7 Feature: When candidate finishes speaking a sentence or turn, compute real-time mentor coaching
        if (role === 'candidate' && message.transcript.trim().length > 15) {
          triggerRealtimeAiMentorFeedback(message.transcript);
        }
      }
    });

    vapiRef.current.on('error', (error) => {
      console.error('Vapi calling error:', error);
      addLogMessage('error', `Connection alert: Switching immediately to high-fidelity Local Voice Simulation mode.`);
      setEngineMode('simulation');
      setCallStatus('idle');
    });
  };

  // Helper to add chat messages to timeline
  const addLogMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), sender, text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }
    ]);
  };

  // ── Day 7: Real-Time AI Mentor Debounced Evaluation ─────────────────────
  const triggerRealtimeAiMentorFeedback = async (speechText) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setMentorFeedback((prev) => ({ ...prev, isUpdating: true }));
    
    feedbackTimeoutRef.current = setTimeout(async () => {
      try {
        const nextTurn = mentorFeedback.turnCount + 1;
        const res = await fetch('/api/ai-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript_snippet: speechText,
            job_role: sessionData?.jobRole || 'Senior AI Engineer',
            candidate_name: sessionData?.candidateName || 'Candidate',
            turn_count: nextTurn
          })
        });
        
        const data = await res.json();
        if (data && data.evaluation) {
          setMentorFeedback({
            ...data.evaluation,
            isUpdating: false,
            turnCount: nextTurn
          });
        }
      } catch (err) {
        console.warn('Real-time AI mentor fetch failed, preserving previous coaching insights:', err);
        setMentorFeedback((prev) => ({ ...prev, isUpdating: false }));
      }
    }, 400); // Debounced interval for smooth UI experience
  };

  // Timer Manager
  const startCallTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setCallDuration(0);
    timerIntervalRef.current = setInterval(() => {
      setCallDuration((prev) => {
        const next = prev + 1;
        if (next >= MAX_CALL_DURATION) {
          handleEndCall();
        }
        return next;
      });
    }, 1000);
  };

  const stopCallTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  // Microphone Audio Analyser & Permission Requester
  const startAudioMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        // Map average volume to percentage (0 - 100)
        const volPercent = Math.min(100, Math.floor((avg / 128) * 100 * 1.5));
        
        if (!isMuted && callStatus === 'active') {
          setVolumeLevel(volPercent);
        } else {
          setVolumeLevel(0);
        }
        
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      
      updateVolume();
      return true;
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      addLogMessage('system', '⚠️ Microphone hardware access restricted; continuing in interactive display mode.');
      return false;
    }
  };

  const stopAudioMonitoring = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try { audioContextRef.current.close(); } catch (e) {}
    }
  };

  // Toggle Microphone Mute State
  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (vapiRef.current && engineMode === 'cloud' && callStatus === 'active') {
      try {
        vapiRef.current.setMuted(nextState);
      } catch (e) {
        console.error('Failed to toggle mute in Vapi SDK:', e);
      }
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !nextState;
      });
    }
    addLogMessage('system', nextState ? 'Microphone muted.' : 'Microphone unmuted.');
  };

  // 2. Primary Trigger: Initiate Live Voice Call
  const handleStartCall = async () => {
    setCallStatus('connecting');
    setMessages([]);
    addLogMessage('system', 'Requesting microphone permissions and initializing Vapi conversational loop...');
    
    await startAudioMonitoring();

    if (engineMode === 'cloud' && vapiRef.current) {
      try {
        // Start live Vapi session with Day 5 evaluated system prompt
        await vapiRef.current.start({
          name: `Interview - ${sessionData?.candidateName || 'Candidate'}`,
          firstMessage: `Hi ${sessionData?.candidateName ? sessionData.candidateName.split(' ')[0] : 'there'}! I'm Alex, your AI Recruiter today. I've reviewed your resume for the ${sessionData?.jobRole || 'position'} role and I'm impressed with your background! To kick us off, could you briefly share what excited you most about applying for this opportunity?`,
          model: {
            provider: 'openai',
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: sessionData?.aiPrompt || 'You are Alex, an empathetic, expert technical recruiter conducting an audio screening call. Ask interactive questions about their resume skills and keep conversational turns concise and supportive.'
              }
            ]
          }
        });
      } catch (cloudError) {
        console.error('Cloud call initiation error:', cloudError);
        addLogMessage('system', 'Cloud connection fallback triggered: Switching immediately to Local Speech Simulation Engine.');
        startSimulationCall();
      }
    } else {
      // Execute high-fidelity interactive simulation mode
      startSimulationCall();
    }
  };

  // Interactive Voice Simulation Engine (Zero Dependency & Always Works for Demo)
  const startSimulationCall = () => {
    setEngineMode('simulation');
    setCallStatus('active');
    startCallTimer();
    setActiveSpeaker('ai');
    setSimulatedTurnIndex(0);

    const initialGreeting = `Hi ${sessionData?.candidateName ? sessionData.candidateName.split(' ')[0] : 'there'}! I am Alex, your AI Recruiter today. I've thoroughly reviewed your resume for the ${sessionData?.jobRole || 'Senior Engineer'} role, especially your impressive work with ${sessionData?.analysis?.matchedSkills?.[0] || 'modern frameworks'}! To begin our call today, could you briefly summarize your proudest technical achievement in your most recent role?`;

    addLogMessage('system', '🟢 Interactive Voice Simulation Engine Active.');
    addLogMessage('ai', initialGreeting);

    // Speak via Browser Web Speech Synthesis API
    speakSimulatedAudio(initialGreeting, () => {
      setActiveSpeaker('candidate');
      addLogMessage('system', '🎙️ AI is listening... Speak into your microphone or click "Simulate Next Interview Turn" below to test live speech coaching & dialogue!');
    });
  };

  const speakSimulatedAudio = (text, onComplete) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setTimeout(() => { if (onComplete) onComplete(); }, 4000);
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    // Animate synthetic volume while speaking
    const synthInterval = setInterval(() => {
      setVolumeLevel(Math.floor(35 + Math.random() * 55));
    }, 150);

    utterance.onend = () => {
      clearInterval(synthInterval);
      setVolumeLevel(0);
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      clearInterval(synthInterval);
      setVolumeLevel(0);
      if (onComplete) onComplete();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Interactive Button to Simulate Next Candidate Answer & AI Follow-Up Question during Demo
  const handleSimulateNextTurn = () => {
    if (callStatus !== 'active') return;
    
    const skills = sessionData?.analysis?.matchedSkills || ['Next.js 15', 'AI Architecture', 'PostgreSQL Database'];
    const nextTurn = simulatedTurnIndex + 1;
    setSimulatedTurnIndex(nextTurn);
    
    setActiveSpeaker('candidate');
    
    // Sample high-quality candidate answer simulation
    let candidateSpeech = 'In my recent enterprise project, I architected a full-stack Next.js 15 application integrated with Google Gemini AI and serverless PostgreSQL endpoints, reducing response latency by over 40% while handling thousands of concurrent requests.';
    if (nextTurn === 2) {
      candidateSpeech = 'For state management and database data layer security, I implemented strict Supabase Row Level Security policies alongside custom JWT auth tokens to guarantee zero data leaks across multi-tenant corporate dashboards.';
    } else if (nextTurn >= 3) {
      candidateSpeech = 'I firmly believe continuous automated evaluation, clear pull-request mentorship, and proactive developer team communication are paramount when shipping generative AI production features at scale.';
    }

    addLogMessage('candidate', candidateSpeech);
    
    // Trigger Day 7 Live Mentor Coaching immediately upon simulated speech
    triggerRealtimeAiMentorFeedback(candidateSpeech);

    // Respond after short delay
    setTimeout(() => {
      setActiveSpeaker('ai');
      let aiFollowUp = `That is a remarkable engineering improvement! Given your deep hands-on expertise with ${skills[1] || 'AI models'} and ${skills[2] || 'cloud systems'}, how do you handle error resilience and edge-case token rate limits in high-concurrency production loops?`;
      if (nextTurn >= 2) {
        aiFollowUp = `Excellent explanation! Your mastery over secure data design and performance scalability matches exactly what our hiring leads are searching for in this ${sessionData?.jobRole || 'role'}! Do you have any questions for me about our collaborative engineering culture before we wrap up today?`;
      }
      
      addLogMessage('ai', aiFollowUp);
      speakSimulatedAudio(aiFollowUp, () => {
        setActiveSpeaker('candidate');
        addLogMessage('system', '🎙️ Waiting for candidate response... (Or click End Interview to complete evaluation)');
      });
    }, 1800);
  };

  // 3. Terminate Call Loop & Trigger Day 8 Post-Call Evaluation
  const handleEndCall = () => {
    setCallStatus('ended');
    stopCallTimer();
    stopAudioMonitoring();
    
    if (engineMode === 'cloud' && vapiRef.current) {
      try { vapiRef.current.stop(); } catch (e) {}
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setActiveSpeaker(null);
    setVolumeLevel(0);
    addLogMessage('system', '🔴 Call terminated cleanly. Archiving interview dialogue records into session memory...');
    addLogMessage('system', '🟢 Day 8 Active: Pre-computing comprehensive executive evaluation via Gemini 1.5 Flash...');
    
    // Save transcript history for Day 8 completion evaluations
    try {
      const transcriptPayload = {
        interviewId,
        candidateName: sessionData?.candidateName,
        jobRole: sessionData?.jobRole,
        durationSeconds: callDuration,
        messages,
        finalMentorClarityScore: mentorFeedback.clarity_score,
        timestamp: new Date().toISOString()
      };
      sessionStorage.setItem('completed_interview_transcript', JSON.stringify(transcriptPayload));

      // Asynchronously initiate Gemini analysis so it is ready when user arrives at /completed
      fetch('/api/ai-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate_interview',
          interview_id: interviewId,
          candidate_name: sessionData?.candidateName || 'Candidate',
          candidate_email: sessionData?.candidateEmail || 'candidate@example.com',
          job_role: sessionData?.jobRole || 'Senior AI Engineer',
          full_transcript: messages
        })
      }).then(res => res.json()).then(data => {
        if (data && data.evaluation) {
          sessionStorage.setItem(`day8_evaluation_${interviewId}`, JSON.stringify({
            data: data.evaluation,
            mode: data.mode
          }));
        }
      }).catch(err => console.warn('Background pre-evaluation note:', err));

    } catch (e) {}
  };

  // Helper for Formatting Elapsed Timer (MM:SS)
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoadingSession) {
    return (
      <div className="flex items-center justify-center p-24">
        <RefreshCw className="w-9 h-9 text-[hsl(258,90%,76%)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-16">
      {/* ── Top Header Navigation & Status ──────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass p-6 rounded-3xl border border-[hsl(222,25%,18%)] shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push(`/interview/${interviewId}`)}
            className="p-3.5 rounded-2xl bg-[hsl(222,47%,12%)] hover:bg-[hsl(222,47%,16%)] text-[hsl(210,40%,98%)] border border-[hsl(222,25%,20%)] transition-all shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[hsl(258,90%,66%)]/20 text-[hsl(258,90%,80%)] border border-[hsl(258,90%,66%)]/35 shadow-sm">
                Day 7 Live Screening Room
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                ⚡ AI Mentor Active
              </span>
              <span className="text-[11px] font-mono text-[hsl(215,20%,50%)]">
                ID: {interviewId}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[hsl(210,40%,98%)] tracking-tight mt-1.5 flex items-center gap-2">
              <span>Live AI Screening:</span>
              <span className="gradient-text">{sessionData?.jobRole}</span>
            </h1>
          </div>
        </div>

        {/* Engine Mode Notification Badge */}
        <div className="flex items-center gap-2.5 text-xs font-semibold px-4 py-2.5 rounded-2xl bg-[hsl(222,47%,10%)] border border-[hsl(222,25%,20%)] shadow-inner relative z-10">
          {engineMode === 'cloud' ? (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300">Vapi Cloud Engine Connected</span>
            </>
          ) : (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300">Interactive Speech Simulator</span>
            </>
          )}
        </div>
      </div>

      {/* ── Main 3-Column Command Dashboard (Day 7 Architectural Upgrade) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Panel (4 Spans): AI Voice Calling Engine & Audio Chamber */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="glass rounded-3xl p-6 border border-[hsl(258,90%,66%)]/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[hsl(222,47%,8%)] to-[hsl(222,47%,12%)] text-center space-y-6 flex-1 flex flex-col justify-between min-h-[520px]">
            
            {/* Top Call Info & Timer */}
            <div className="flex items-center justify-between border-b border-[hsl(222,25%,18%)] pb-3.5 text-xs text-[hsl(215,20%,65%)] font-semibold">
              <div className="flex items-center gap-1.5 truncate">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate">Candidate: <strong className="text-[hsl(210,40%,98%)]">{sessionData?.candidateName}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-mono bg-[hsl(222,47%,14%)] px-2.5 py-1 rounded-xl border border-[hsl(222,25%,22%)] text-[hsl(210,40%,98%)] flex-shrink-0">
                <Clock className="w-3.5 h-3.5 text-[hsl(258,90%,76%)]" />
                <span>{formatTime(callDuration)}</span>
              </div>
            </div>

            {/* Central Visualizer & Speaker Status */}
            <div className="py-4 space-y-5 flex-1 flex flex-col justify-center">
              {/* Speaker Icon Badge with Pulse Effect */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                {callStatus === 'active' && volumeLevel > 10 && (
                  <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(258,90%,66%)] to-emerald-500 opacity-35 animate-ping"
                    style={{ transform: `scale(${1 + (volumeLevel / 160)})` }}
                  />
                )}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[hsl(222,47%,16%)] to-[hsl(258,90%,66%)]/35 border-2 border-[hsl(258,90%,76%)]/50 flex items-center justify-center shadow-2xl relative z-10 transition-all duration-300">
                  {activeSpeaker === 'ai' ? (
                    <Bot className="w-12 h-12 text-[hsl(258,90%,80%)] animate-bounce" />
                  ) : activeSpeaker === 'candidate' ? (
                    <User className="w-12 h-12 text-emerald-300 animate-pulse" />
                  ) : (
                    <PhoneCall className={`w-10 h-10 text-[hsl(215,20%,65%)] ${callStatus === 'connecting' ? 'animate-spin' : ''}`} />
                  )}
                </div>
              </div>

              {/* Status Message */}
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-[hsl(210,40%,98%)] leading-tight">
                  {callStatus === 'idle' && 'Ready to Begin Screening'}
                  {callStatus === 'connecting' && 'Establishing Audio Tunnel...'}
                  {callStatus === 'active' && (
                    activeSpeaker === 'ai' 
                      ? '🎙️ Alex is Speaking...' 
                      : activeSpeaker === 'candidate' 
                        ? '🟢 Listening to You (Mic On)' 
                        : 'Call Active — Awaiting Speech'
                  )}
                  {callStatus === 'ended' && '✔ Interview Concluded'}
                </h3>
                <p className="text-[11px] text-[hsl(215,20%,60%)] px-2 leading-relaxed">
                  {callStatus === 'idle' && 'Click below to launch speech screening. Ensure browser microphone permissions are enabled.'}
                  {callStatus === 'active' && 'Speak naturally. Our AI evaluates structural clarity, depth, and resume alignments in real-time.'}
                  {callStatus === 'ended' && 'Your conversational feedback and evaluation records have been saved into memory.'}
                </p>
              </div>

              {/* Real-Time Audio Spectrum Bars */}
              {callStatus === 'active' && (
                <div className="flex items-center justify-center gap-1.5 h-9 pt-1">
                  {[...Array(14)].map((_, i) => {
                    const multiplier = Math.sin((i + 1) * 0.5) * 0.8 + 0.5;
                    const height = Math.max(5, Math.min(34, Math.floor(volumeLevel * multiplier * 0.4)));
                    return (
                      <div
                        key={i}
                        style={{ height: `${height}px` }}
                        className="w-1.5 rounded-full bg-gradient-to-t from-emerald-500 via-[hsl(258,90%,70%)] to-[hsl(258,90%,80%)] transition-all duration-75 shadow-sm"
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Primary Controllers */}
            <div className="pt-4 border-t border-[hsl(222,25%,18%)] flex flex-col gap-3">
              {callStatus === 'idle' || callStatus === 'ended' ? (
                <Button
                  type="button"
                  onClick={handleStartCall}
                  disabled={callStatus === 'connecting'}
                  className="w-full py-4 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-[hsl(258,90%,66%)] hover:from-emerald-600 hover:to-[hsl(258,90%,60%)] text-white font-bold text-sm shadow-xl hover:shadow-[hsl(258,90%,66%)]/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>{callStatus === 'ended' ? 'Re-Launch Voice Call' : 'Start Live Voice Interview'}</span>
                </Button>
              ) : (
                <div className="flex flex-col gap-2.5 w-full">
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    {/* Mute Button */}
                    <Button
                      type="button"
                      variant={isMuted ? 'destructive' : 'secondary'}
                      onClick={toggleMute}
                      disabled={callStatus !== 'active'}
                      className={`py-3 h-11 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md ${
                        isMuted 
                          ? 'bg-rose-500 text-white hover:bg-rose-600' 
                          : 'bg-[hsl(222,47%,16%)] text-[hsl(210,40%,98%)] hover:bg-[hsl(222,47%,20%)] border border-[hsl(222,25%,25%)]'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{isMuted ? 'Unmute Mic' : 'Mute Mic'}</span>
                    </Button>

                    {/* End Call Button */}
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleEndCall}
                      className="py-3 h-11 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-xs shadow-xl hover:shadow-rose-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PhoneOff className="w-3.5 h-3.5" />
                      <span>End & Save</span>
                    </Button>
                  </div>

                  {/* Simulation Demo Turn Button (Only in simulation mode) */}
                  {engineMode === 'simulation' && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSimulateNextTurn}
                      className="w-full text-[11px] font-semibold py-2.5 h-10 rounded-xl bg-[hsl(258,90%,66%)]/15 hover:bg-[hsl(258,90%,66%)]/25 text-[hsl(258,90%,80%)] border border-[hsl(258,90%,66%)]/40 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-spin text-[hsl(258,90%,80%)]" />
                      <span>✨ Simulate Next Answer Turn</span>
                    </Button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Center Panel (5 Spans): Real-Time Conversational Transcript Feed */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="glass rounded-3xl p-6 border border-[hsl(222,25%,18%)] shadow-2xl flex-1 flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-[hsl(222,25%,16%)] pb-3.5 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[hsl(258,90%,80%)]">
                <MessageSquare className="w-4 h-4 text-[hsl(258,90%,76%)]" />
                <span>Live Dialogue Transcript</span>
              </div>
              <span className="text-[10px] font-mono text-[hsl(215,20%,50%)] bg-[hsl(222,47%,12%)] px-2.5 py-1 rounded-lg border border-[hsl(222,25%,18%)]">
                {messages.length} Events Logged
              </span>
            </div>

            {/* Transcript Log List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar text-xs">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-[hsl(215,20%,50%)] space-y-3 p-6">
                  <div className="w-14 h-14 rounded-2xl bg-[hsl(222,47%,12%)] border border-[hsl(222,25%,20%)] flex items-center justify-center text-[hsl(258,90%,76%)] shadow-inner">
                    <Terminal className="w-7 h-7 opacity-75" />
                  </div>
                  <p className="font-bold text-[hsl(210,40%,90%)] text-sm">Conversation Feed Awaiting Launch</p>
                  <p className="text-[11px] max-w-xs leading-relaxed opacity-80">
                    Start the audio call above to observe low-latency speech-to-text conversion, system turns, and timestamped interviewer interactions.
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        msg.sender === 'ai'
                          ? 'bg-[hsl(258,90%,66%)]/10 border-[hsl(258,90%,66%)]/30 text-[hsl(210,40%,98%)] ml-2 shadow-sm'
                          : msg.sender === 'candidate'
                          ? 'bg-[hsl(222,47%,14%)] border-emerald-500/35 text-emerald-300 mr-2 shadow-sm'
                          : 'bg-[hsl(222,47%,10%)] border-[hsl(222,25%,20%)] text-[hsl(215,20%,60%)] text-[11px] italic'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 text-[10px] font-bold uppercase tracking-wider opacity-80">
                        <span className="flex items-center gap-1.5">
                          {msg.sender === 'ai' && '🤖 Alex (AI Recruiter)'}
                          {msg.sender === 'candidate' && '👤 Candidate (You)'}
                          {msg.sender === 'system' && '⚙️ System Notice'}
                          {msg.sender === 'error' && '⚠️ Connection Alert'}
                        </span>
                        <span className="font-mono text-[9px] opacity-70">{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap font-sans text-xs">{msg.text}</p>
                    </div>
                  ))}
                  <div ref={transcriptEndRef} />
                </>
              )}
            </div>

            {/* Post-Call Navigation Action (Day 8 Milestone Bridge) */}
            {callStatus === 'ended' && (
              <div className="mt-4 pt-4 border-t border-[hsl(222,25%,18%)] animate-in fade-in duration-300 space-y-2">
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-center text-xs text-emerald-300 font-bold">
                  ✔ Interview archived! Click below to review your Day 8 evaluation dossier & CTO hiring rating.
                </div>
                <Button
                  type="button"
                  onClick={() => router.push(`/interview/${interviewId}/completed`)}
                  className="w-full py-3.5 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-[hsl(258,90%,66%)] hover:from-emerald-600 hover:to-[hsl(258,90%,60%)] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl hover:shadow-[hsl(258,90%,66%)]/40 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 animate-bounce text-white" />
                  <span>View Complete Day 8 Evaluation & Executive Results &rarr;</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel (3 Spans): Day 7 Real-Time AI Mentor & Coaching Sidebar */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="glass rounded-3xl p-5 border border-emerald-500/30 shadow-2xl flex-1 flex flex-col justify-between h-[520px] bg-gradient-to-b from-[hsl(222,47%,8%)] to-[hsl(222,47%,11%)] relative overflow-hidden">
            
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[hsl(222,25%,18%)] pb-3.5 mb-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  <Brain className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Live AI Mentor Tips</span>
                </div>
                {mentorFeedback.isUpdating && (
                  <RefreshCw className="w-3.5 h-3.5 text-[hsl(258,90%,76%)] animate-spin" />
                )}
              </div>

              {/* Mentor Analysis Cards */}
              <div className="space-y-4 text-xs">
                
                {/* Real-Time Coaching Suggestion Card */}
                <div className="p-4 rounded-2xl bg-[hsl(222,47%,12%)]/90 border border-emerald-500/30 shadow-inner space-y-2 relative transition-all duration-500">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Actionable Coaching Tip</span>
                  </div>
                  <p className="text-[hsl(210,40%,95%)] text-[11px] leading-relaxed font-medium">
                    &ldquo;{mentorFeedback.suggestion}&rdquo;
                  </p>
                </div>

                {/* Speech Tonal Sentiment & Clarity Meter */}
                <div className="p-3.5 rounded-2xl bg-[hsl(222,47%,10%)] border border-[hsl(222,25%,20%)] space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[hsl(215,20%,65%)] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[hsl(258,90%,76%)]" />
                      Speech Tone:
                    </span>
                    <span className="font-bold text-[hsl(210,40%,98%)] bg-[hsl(258,90%,66%)]/20 px-2.5 py-0.5 rounded-lg border border-[hsl(258,90%,66%)]/40 text-[10px]">
                      {mentorFeedback.tone}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-[hsl(215,20%,65%)] flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        Clarity & Structure:
                      </span>
                      <span className="text-emerald-400 font-mono font-bold">{mentorFeedback.clarity_score}%</span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[hsl(222,47%,16%)] overflow-hidden p-0.5 border border-[hsl(222,25%,22%)]">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[hsl(258,90%,66%)] to-emerald-400 transition-all duration-700 ease-out"
                        style={{ width: `${mentorFeedback.clarity_score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Live Competency Keywords Identified */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[hsl(215,20%,60%)] flex items-center gap-1.5">
                    <Target className="w-3 h-3 text-[hsl(258,90%,76%)]" />
                    <span>Live Competencies Detected:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(mentorFeedback.topics || []).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg text-[10px] font-bold tracking-tight bg-[hsl(222,47%,16%)] text-[hsl(258,90%,82%)] border border-[hsl(258,90%,66%)]/30 shadow-xs"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Next Probing Angle for Recruiter */}
                <div className="p-3 rounded-xl bg-[hsl(258,90%,66%)]/10 border border-[hsl(258,90%,66%)]/25 text-[11px] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[hsl(258,90%,80%)] flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>Recruiter Probe Hint:</span>
                  </div>
                  <p className="text-[hsl(210,40%,90%)] text-[11px] italic">
                    {mentorFeedback.next_angle}
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom AI Mentor Status Footer */}
            <div className="pt-3 border-t border-[hsl(222,25%,16%)] flex items-center justify-between text-[10px] text-[hsl(215,20%,50%)]">
              <span>Model: <strong className="text-[hsl(210,40%,85%)]">Gemini 1.5 Flash</strong></span>
              <span className="text-emerald-400 font-mono">● Realtime Loop</span>
            </div>

          </div>
        </div>

      </div>

      {/* ── Bottom Session Memory & System Inspection Bar ───────────────── */}
      <div className="glass rounded-2xl p-4 border border-[hsl(222,25%,16%)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[hsl(215,20%,60%)] shadow-lg">
        <div className="flex items-center gap-2.5 truncate">
          <Terminal className="w-4 h-4 text-[hsl(258,90%,76%)] flex-shrink-0" />
          <span className="truncate">
            Active Prompt Tunnel: <strong className="text-[hsl(210,40%,98%)]">Injected into Vapi Assistant Loop ({sessionData?.aiPrompt?.length || 0} chars)</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-[hsl(215,20%,50%)]">Turn Count: {mentorFeedback.turnCount || 0}</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30">
            <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>Day 7 Pipeline Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

# Day 47: Content Intelligence Studio

## Overview
Content Intelligence Studio is a single-page AI content consultant application. It accepts both text drafts and optional image/graphic files (such as screenshots, thumbnails, or banners) and executes an autonomous, multi-stage review workflow using a swarm of specialized AI reviewers powered directly by the Claude Messages API.

## User Interview Setup
The application is pre-configured with options corresponding to the choices selected in the interactive developer onboarding interview:
1. **Content Type**: Written Article / Blog Post (Written article, blog post, or newsletter)
2. **Platform**: LinkedIn (LinkedIn Articles)
3. **Goal**: Educate & Build Community (Educate/inform the audience on a specific topic)
4. **Input Streams**: Text copy only (with optional graphic upload)
5. **Review Severity**: Gentle & Supportive (Soft & Supportive feedback, building confidence)

---

## Agentic Swarm Architecture
Rather than calling a single general-purpose prompt, the application spins up three specialized sub-agents sequentially to critique the content, followed by a Synthesis Architect coordinator that integrates their outputs into unified metrics and copy:

1. **Agent 1: Hook & Visual Scroll-Stopper**
   - **Role**: Expert in scroll-stopping visual layouts, emoji density, and immediate reader hook rates.
   - **Task**: Inspects base64 graphics (if uploaded) and checks if the first 3 lines of text will capture a scrolling reader on LinkedIn.

2. **Agent 2: Value & Authority Assessor**
   - **Role**: Credibility inspector, checking for intellectual depth and originality.
   - **Task**: Identifies corporate jargon, cliché tropes, generic advice, and empty filler to build thought leadership.

3. **Agent 3: Audience Psychology Specialist**
   - **Role**: Behavioral psychology copywriter.
   - **Task**: Audits cognitive reading load, curiosity loops, community-building factors, and CTA friction.

4. **Agent 4: Synthesis Architect**
   - **Role**: Chief content compiler.
   - **Task**: Consolidates the critiques of the 3 specialists, computes metrics, writes optimized rewritten copy, creates hooks, and outputs the final executive reports.

---

## Technical Design Decisions
- **Adaptive Review Severity**: Prompts for Hook, Value, and Audience Psychology specialized reviewer agents automatically adapt their guidelines and constraints based on the chosen severity (Brutally Honest, Balanced, Gentle, or Psychological) to match the writer's desired tone and feedback level.
- **XML Tag Resiliency**: To avoid syntax exceptions (e.g. `SyntaxError: Unexpected token... expected '{' or '('` when forcing LLMs to return JSON), the coordinator agent outputs structured XML tags (e.g., `<overall_score>`, `<strengths>`). A custom regex-free JS parser extracts and cleans tag contents, offering absolute robustness.
- **Multi-Provider API Integration (Groq & Anthropic)**: Connects to either Groq (`https://api.groq.com/openai/v1/chat/completions`) or Anthropic (`https://api.anthropic.com/v1/messages`) depending on the selected provider. It supports Groq's high-speed OpenAI-compatible payloads and automatically maps Llama models (e.g., `llama-3.3-70b-versatile` and `llama-3.2-90b-vision-preview` for images) as well as Claude models. Includes a settings override modal for API keys that stores settings locally in the browser.
- **CORS Proxy Support**: Dynamically prefixes requests with a customizable CORS Proxy (defaults to `https://corsproxy.io/?`) to bypass browser origin security checks. If `corsproxy.io` is used, the URL is concatenated unencoded to allow correct preflight (`OPTIONS`) request negotiation on the proxy backend.
- **Micro-Animations & Visuals**: Includes active indicator pulses, loading skeletal cards, terminal logs updating in real-time, side-by-side comparative diff boxes, copy buttons, and an interactive SVG progress gauge.

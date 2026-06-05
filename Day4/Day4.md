# Day 4: Chain-of-Thought Prompting (Career Roadmap Generator)

## Concept Learned

Today, I explored **Chain-of-Thought (CoT) Prompting**, which forces AI models (like Claude) to reason through a problem step-by-step before delivering the final output. Instead of jumping straight to conclusions, the model evaluates assumptions, builds a structured thought process, and provides highly customized results.

## The Prompt Template Used

```text
You are an Elite AI Career Strategist.
Your goal is to build a personalized roadmap for me.
Before creating the roadmap, ask me ONLY these 4 questions:
1. What is your current situation?
2. What skills do you currently have?
3. What is your target goal?
4. What is your target timeline?

After collecting all answers, Think step by step:
1. Analyze current position -> 2. Identify strengths -> 3. Identify skill gaps -> 4. Map the fastest path -> 5. Recommend learning & projects -> 6. Design milestones.

Output Requirements: Generate a visually structured ONE-PAGE roadmap (A4 Portrait consulting style) with Current Position, Skill Gap Analysis, Learning Plan, Projects, and Monthly Milestones.
End with: "Generated using Chain-of-Thought Reasoning"
```

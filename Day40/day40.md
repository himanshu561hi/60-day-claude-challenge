# Day 40: CodeMentor AI Assistant

## Overview
Based on the interactive user interview, we built **CodeMentor AI**, a specialized assistant tailored for junior developers. It provides a highly structured code review and mentorship session, offering friendly, patient, and encouraging feedback.

## User Interview Summary
1. **Domain**: Coding/Technical Assistant (Code generation, debugging, architecture reviews)
2. **Target Audience**: Junior developers learning best practices.
3. **Important Outcome**: Clear explanations and functional code.
4. **Input Format**: Multi-turn conversational chat (typing questions and pasting code snippets).
5. **Output Format**: A structured report (Bugs Found, Best Practices, Refactored Code).
6. **Tone**: Friendly, encouraging, and patient.

## The Assistant's "Brain" (System Prompt)
We designed a production-quality system prompt that restricts Claude into a structured report mode. 
- **Role**: Friendly and patient coding mentor.
- **Constraints**: Ignore conversational filler, redirect off-topic questions, maintain a supportive tone.
- **Output Format**: Strict Markdown headers (`### 🐛 Bugs & Issues Found`, `### 💡 Best Practices & Improvements`, `### 🛠️ Refactored Code`, `### 📚 Mentor's Note`).

## The UI Design
Built as a single self-contained HTML file (`index.html`), the interface includes:
- **Premium Aesthetics**: Dark theme (`#0b0f19`) with glassmorphism effects, a subtle gradient background, and accent colors `#818cf8` and `#10b981`.
- **Responsive Layout**: A collapsible "How this was built" documentation panel alongside a main chat area.
- **Message Rendering**: A custom vanilla JS markdown parser transforms the assistant's structured report into beautiful HTML components (cards, stylized headers, and custom code blocks with a working copy button).
- **Interactions**: Smooth animations for incoming messages, auto-resizing text area, and a pulsating loading indicator.
- **API Call**: Makes direct `fetch` requests to `https://api.anthropic.com/v1/messages`. It expects the API key injection to be handled by the user's proxy/extension as requested ("no API key needed, it's handled").

## How to Extend
- **Memory**: The app currently stores session memory in the `messages` array in-memory. It can be extended to `localStorage` or a database.
- **Tools**: The system prompt could be enhanced to support tool use (e.g., executing code in a sandbox or searching documentation).
- **Multi-step flows**: Introduce UI state changes for different stages of learning (e.g., "Review Mode" vs "Quiz Mode").

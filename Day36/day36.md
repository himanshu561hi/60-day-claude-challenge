# Day 36 - Cognitive Pattern Explorer

## Overview
Cognitive Pattern Explorer is a single-file offline web app designed as a psychology-inspired self-reflection experience. It provides an interactive space for users to discover their thinking tendencies through thoughtful scenarios and drag-and-drop prioritization exercises, delivering personalized insights in a calm, non-diagnostic format.

## Features
- **Calm/Stress Modes:** The app allows users to choose their current mental state, dynamically adjusting the CSS theme to be lighter (calm) or darker with different visual weights (stress).
- **Scenario Discovery:** Interactive questions built natively to determine processing patterns.
- **Drag-and-Drop Activities:** Features native HTML5 drag-and-drop logic combined with touch fallbacks for mobile support to map priorities and thought processes.
- **Percentage Breakdown:** A visually appealing final report that translates interactions into a fluid tendency breakdown using percentage bars.
- **Offline & Framework-Free:** Built strictly with vanilla JavaScript, semantic HTML, and CSS variables within a single file.

## Technical Details
- **Drag & Drop Logic:** Managed via the standard `dragstart`, `dragenter`, `dragover`, and `drop` events. Built-in sortability logic tracks position within drop zones.
- **Touch Support:** To ensure functionality on touchscreen devices, parallel `touchstart`, `touchmove`, and `touchend` event handlers construct a visible clone of the dragged element, tracking interactions computationally via `elementFromPoint`.
- **State Management:** A lightweight `state` object controls the application's flow, tracking the current chapter index and dynamically updating score values per tendency (`analytical`, `emotional`, `overthinking`, `action`, `balanced`).
- **Responsive Animations:** Uses CSS `transition` and `animation` to build a calm, fluid experience, coupled with `@media (prefers-reduced-motion)` for accessibility.

## Use Cases
- A calming mindfulness exercise.
- Understanding personal habits and potential cognitive biases.
- Interactive UX/UI drag-and-drop demonstration.

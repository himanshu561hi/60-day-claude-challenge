# Day 20: Build an AI Face Puzzle Game 🧩📸

## 📝 Project Overview

For Day 20 of the challenge, I built a complete, self-contained **AI Face Puzzle Game** using pure vanilla HTML, CSS, and JavaScript. The application accesses the user's webcam, captures a snapshot, and instantly transforms their face into an interactive sliding/swapping puzzle grid.

### 🚀 Key Features

* **Webcam Integration:** Requests permissions and streams front-facing video smoothly using the `MediaDevices.getUserMedia()` API.
* **Dynamic Grid Slicing:** Users can choose between three difficulty levels: Easy (3x3), Medium (4x4), and Hard (5x5). The captured canvas image is sliced dynamically using CSS background positions or HTML5 Canvas coordinates.
* **Solvability Guarantee:** The scramble algorithm ensures that the generated configuration is mathematically solvable.
* **Cross-Platform Input:** Full support for standard mouse drag-and-drop events alongside touch gestures (`touchstart`, `touchmove`, `touchend`) for mobile and tablet playability.
* **Performance Indicators:** Features a live running timer (formatted as `mm:ss.t`), a total move counter, and a real-time tracking metric showing correctly positioned pieces.
* **Local Leaderboard:** Saves the top 5 fastest completion times to `localStorage`, categorized by difficulty level, including the date and number of moves.

---

## 🛠️ Tech Stack & Concepts Used

* **Frontend:** Semantic HTML5, modern responsive CSS (Flexbox/Grid, transitions, and hover states).
* **APIs:** Web Camera API (`getUserMedia` & `<video>`), Canvas API (`drawImage`).
* **State Management:** Native JavaScript Event Listeners, Touch Event mapping, and `localStorage` for high-score persistence.

---

## 💡 Key Learnings & Takeaways

1. **Handling Touch Coordinate Vectors:** Learned how to map touch events (`e.touches[0].clientX`) to match the DOM element positions underneath them during active drag sessions, which behaves differently than standard desktop mouse drag states.
2. **Deterministic Scrambling:** Explored puzzle solvability logic. For classic grid-shuffling games, ensuring an inversion count parity checks out prevents creating impossible-to-solve boards.
3. **Vanilla Drag & Drop UI Feedback:** Dynamically toggling visual indicators (such as green borders for correctly aligned items and distinct drop zone highlighting) entirely via state arrays makes the interface highly reactive without heavy frameworks.

---

## 📸 Screenshots & Gameplay

*Add your application screenshots here!*

* `![Game Launch & Camera Feed](./camera-preview.png)`
* `![Active Gameplay Grid](./gameplay.png)`
* `![Win Screen & Leaderboard](./victory-leaderboard.png)`

# Day 39: PDF Splitter & Merger

## Objective
Create a premium single-page interactive HTML application that allows users to split and merge PDF files entirely within the browser.

## Features Implemented
- **PDF Splitter**:
  - Upload a PDF and automatically detect the total number of pages.
  - Display visual page thumbnails for every page using `pdf.js`.
  - Split options: Extract selected pages, split into multiple files (custom page ranges like 1-3, 5, 7-10), and split every N pages.
  - Interactive page selection to automatically build the custom range input.
- **PDF Merger**:
  - Upload multiple PDF files using drag-and-drop or file selection.
  - Sortable file list with page counts and visual previews using `SortableJS` and `pdf.js`.
  - Drag-and-drop reordering before merging.
- **UI/UX**:
  - Polished commercial application design with modern interactive elements.
  - Dark mode (default) and Light mode toggle.
  - Drag-and-drop file upload zones with hover effects and animations.
  - Loading overlays with spinner and toast notifications for user feedback.
  - Responsive layouts ensuring it works flawlessly on different screen sizes.

## Technologies Used
- HTML, Vanilla CSS, JavaScript
- `pdf-lib` for client-side PDF manipulation (splitting, merging).
- `pdf.js` for rendering PDF page thumbnails.
- `SortableJS` for drag-and-drop list reordering.
- Font Awesome for icons.
- Google Fonts (Inter) for modern typography.

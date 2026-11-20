# Basic Arithmetic Calculator

A clean, responsive, and accessible web-based calculator built with **HTML5**, **CSS3**, and **Vanilla JavaScript** as Task 3 of the **CodeOrbit Tech Web Development Virtual Internship (Batch 3)**.

## 🔗 Links

- **GitHub Repository:** [https://github.com/Bongstudents-official/<your-repo-name>](https://github.com/Bongstudents-official/CodeOrbit_Calculator)

## 🛠️ Technologies Used

- **HTML5:** Semantic structure (`<main>`) with `data-*` attributes for clean event delegation and `aria-live="polite"` for screen-reader display updates.
- **CSS3:** CSS Grid 4-column keypad layout, Flexbox display alignment, responsive sizing, and tactile button hover/active micro-interactions.
- **Vanilla JavaScript (ES6+):** State-driven arithmetic engine supporting chained calculations, floating-point precision rounding, error handling, and full physical keyboard support.

## ✨ Key Features

- **Core Arithmetic Operations:** Supports addition (`+`), subtraction (`−`), multiplication (`×`), and division (`÷`) with chained calculation support.
- **Edge-Case & Error Protection:** Gracefully catches division by zero (`Cannot divide by 0`), prevents duplicate decimal points in a single number, allows mid-entry operator switching, and rounds results to 10 decimal places to prevent floating-point inaccuracies.
- **Full Keyboard Support:** Type directly using number keys (`0–9`), `.`, `+`, `-`, `*`, `/`, `Enter` or `=` to compute, `Backspace` to delete a digit, and `Escape` to clear all (`AC`).
- **Modern Dark UI:** High-contrast slate theme with color-coded utility (`AC`, `DEL`), operator, and equals buttons.

## 📂 Project Structure

```text
├── index.html      # Calculator display and keypad markup
├── styles.css      # CSS Grid keypad layout and dark theme styling
├── script.js       # Calculator state logic, error handling, and keyboard listeners
└── README.md       # Project documentation
```

## 🚀 Setup Instructions

No build tools, package managers, or external dependencies are required.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Bongstudents-official/](https://github.com/Bongstudents-official/)CodeOrbit_Calculator.git
   ```
2. **Navigate to the project folder:**
   ```bash
   cd CodeOrbit_Calculator
   ```
3. **Run the project:**
   - Open `index.html` directly in any modern web browser, **or**
   - Serve locally with VS Code Live Server or `python -m http.server 8000`.

## 👤 Author

**Shubhadeep Samanta**  
Web Development Intern — CodeOrbit Tech (Batch 3)

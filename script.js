document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const previousOperandEl = document.getElementById("previous-operand");
    const currentOperandEl = document.getElementById("current-operand");
    const numberButtons = document.querySelectorAll("[data-number]");
    const operatorButtons = document.querySelectorAll("[data-operator]");
    const clearButton = document.querySelector('[data-action="clear"]');
    const deleteButton = document.querySelector('[data-action="delete"]');
    const equalsButton = document.querySelector('[data-action="equals"]');

    // Calculator State Variables
    let currentOperand = "0";
    let previousOperand = "";
    let operation = null;
    let shouldResetScreen = false;
    let hasError = false;

    /**
     * Resets all calculator values and clears any error state back to "0".
     */
    function clearAll() {
        currentOperand = "0";
        previousOperand = "";
        operation = null;
        shouldResetScreen = false;
        hasError = false;
        updateDisplay();
    }

    /**
     * Removes the last digit from the current input, or resets after an error.
     */
    function deleteDigit() {
        if (hasError || shouldResetScreen) {
            clearAll();
            return;
        }

        if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith("-"))) {
            currentOperand = "0";
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }
        updateDisplay();
    }

    /**
     * Appends a digit or decimal point to the current operand while blocking invalid formats.
     * @param {string} number - The digit ("0"-"9") or decimal point (".") clicked/pressed.
     */
    function appendNumber(number) {
        // Recover cleanly if the user starts typing after an error message
        if (hasError) {
            clearAll();
        }

        // Start fresh if a calculation just finished
        if (shouldResetScreen) {
            currentOperand = number === "." ? "0." : number;
            shouldResetScreen = false;
            updateDisplay();
            return;
        }

        // Prevent more than one decimal point in the same number
        if (number === "." && currentOperand.includes(".")) return;

        // Replace leading zero unless adding a decimal point
        if (currentOperand === "0" && number !== ".") {
            currentOperand = number;
        } else {
            currentOperand += number;
        }

        updateDisplay();
    }

    /**
     * Stores the selected arithmetic operator and computes any pending operation first.
     * @param {string} selectedOperator - One of "+", "-", "×", or "÷".
     */
    function chooseOperation(selectedOperator) {
        if (hasError) {
            clearAll();
            return;
        }

        // Allow changing the operator if the user hasn't entered the second number yet
        if (operation !== null && shouldResetScreen) {
            operation = selectedOperator;
            updateDisplay();
            return;
        }

        // If an operation is already queued, evaluate it before chaining the next one
        if (previousOperand !== "") {
            compute();
            if (hasError) return;
        }

        operation = selectedOperator;
        previousOperand = currentOperand;
        shouldResetScreen = true;
        updateDisplay();
    }

    /**
     * Performs the arithmetic calculation between previousOperand and currentOperand,
     * handling division by zero and floating-point precision safely.
     */
    function compute() {
        if (operation === null || hasError) return;

        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);

        // Guard against non-numeric or incomplete values
        if (isNaN(prev) || isNaN(current)) return;

        let result;

        switch (operation) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "×":
                result = prev * current;
                break;
            case "÷":
                if (current === 0) {
                    displayError("Cannot divide by 0");
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Round to 10 decimal places to prevent floating-point quirks (e.g., 0.1 + 0.2)
        result = Math.round(result * 1e10) / 1e10;

        if (!isFinite(result)) {
            displayError("Invalid operation");
            return;
        }

        currentOperand = result.toString();
        operation = null;
        previousOperand = "";
        shouldResetScreen = true;
        updateDisplay();
    }

    /**
     * Displays a user-friendly error message and locks operations until cleared or overwritten.
     * @param {string} message - Error text shown on the main display.
     */
    function displayError(message) {
        currentOperand = message;
        previousOperand = "";
        operation = null;
        hasError = true;
        shouldResetScreen = true;
        updateDisplay();
    }

    /**
     * Synchronizes the internal calculator state with the DOM display elements.
     */
    function updateDisplay() {
        currentOperandEl.textContent = currentOperand;
        previousOperandEl.textContent = operation ? `${previousOperand} ${operation}` : "";
    }

    /**
     * Maps physical keyboard presses to calculator actions for faster desktop input.
     * @param {KeyboardEvent} event - The keydown event triggered by the user.
     */
    function handleKeyboardInput(event) {
        const key = event.key;

        if ((key >= "0" && key <= "9") || key === ".") {
            appendNumber(key);
        } else if (key === "+" || key === "-") {
            chooseOperation(key);
        } else if (key === "*") {
            chooseOperation("×");
        } else if (key === "/") {
            event.preventDefault(); // Prevent browser quick-find shortcut
            chooseOperation("÷");
        } else if (key === "Enter" || key === "=") {
            event.preventDefault();
            compute();
        } else if (key === "Backspace") {
            deleteDigit();
        } else if (key === "Escape") {
            clearAll();
        }
    }

    // Event Listeners for Buttons
    numberButtons.forEach((button) => {
        button.addEventListener("click", () => appendNumber(button.dataset.number));
    });

    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => chooseOperation(button.dataset.operator));
    });

    equalsButton.addEventListener("click", compute);
    clearButton.addEventListener("click", clearAll);
    deleteButton.addEventListener("click", deleteDigit);

    // Event Listener for Keyboard Support
    document.addEventListener("keydown", handleKeyboardInput);
});

const display = document.getElementById("display");

// Add value to display
function appendValue(value) {
    display.value += value;
    showPreview();
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
    showPreview();
}

// Calculate result
function calculate() {
    try {
        if (display.value.trim() === "") return;

        const result = eval(display.value);
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

// Real-time preview (shown in console)
function showPreview() {
    try {
        if (display.value !== "") {
            const result = eval(display.value);
            console.log("Preview:", result);
        }
    } catch {
        // Ignore incomplete expressions
    }
}

// Keyboard Support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if ("0123456789+-*/.".includes(key)) {
        appendValue(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
    showPreview();
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    showPreview();
}

function calculate() {
    try {
        display.value = Function('"use strict"; return (' + display.value + ')')();
    } catch {
        display.value = "Error";
    }
}

function showPreview() {
    try {
        if (display.value !== "") {
            const result = Function('"use strict"; return (' + display.value + ')')();
            console.log("Preview:", result);
        }
    } catch {
        // Ignore incomplete expressions
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if ("0123456789+-*/.".includes(key)) {
        appendValue(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    themeBtn.textContent =
        document.body.classList.contains("light")
            ? "☀️"
            : "🌙";
});
const historyList = document.getElementById("history-list");

function calculate() {
    try {
        const expression = display.value;
        const result = eval(expression);

        const item = document.createElement("li");
        item.textContent = `${expression} = ${result}`;

        historyList.prepend(item);

        display.value = result;
    } catch {
        display.value = "Error";
    }
}
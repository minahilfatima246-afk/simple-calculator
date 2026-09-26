let current = "";
let previous = "";

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const historyList = document.getElementById("historyList");

function updateDisplay() {
currentDisplay.textContent = current || "0";
previousDisplay.textContent = previous;
}

function append(value) {
current += value;
updateDisplay();
}

function clearDisplay() {
current = "";
previous = "";
updateDisplay();
}

function deleteLast() {
current = current.slice(0, -1);
updateDisplay();
}

function calculate() {
if (!current) return;

```
try {
    let expression = current;

    // Convert calculator symbols into JavaScript operators
    expression = expression.replace(/×/g, "*");
    expression = expression.replace(/÷/g, "/");

    // Basic safety check
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error("Invalid expression");
    }

    let result = Function('"use strict"; return (' + expression + ')')();

    if (!Number.isFinite(result)) {
        throw new Error("Invalid calculation");
    }

    previous = current + " =";
    current = String(Number(result.toFixed(10)));

    addToHistory(previous + " " + current);
    updateDisplay();

} catch (error) {
    current = "";
    previous = "Error";
    updateDisplay();
}
```

}

function calculatePercentage() {
if (!current) return;

```
try {
    let result = Function('"use strict"; return (' + current + ')')();
    result = result / 100;

    previous = current + "% =";
    current = String(result);

    addToHistory(previous + " " + current);
    updateDisplay();

} catch {
    previous = "Error";
    current = "";
    updateDisplay();
}
```

}

function calculateFunction(type) {
if (!current) return;

```
try {
    let number = Number(
        Function('"use strict"; return (' + current + ')')()
    );

    let result;

    switch (type) {
        case "sin":
            result = Math.sin(number * Math.PI / 180);
            break;

        case "cos":
            result = Math.cos(number * Math.PI / 180);
            break;

        case "tan":
            result = Math.tan(number * Math.PI / 180);
            break;

        case "sqrt":
            result = Math.sqrt(number);
            break;

        case "square":
            result = number ** 2;
            break;
    }

    if (!Number.isFinite(result)) {
        throw new Error("Invalid calculation");
    }

    previous = type + "(" + current + ") =";
    current = String(Number(result.toFixed(10)));

    addToHistory(previous + " " + current);
    updateDisplay();

} catch {
    previous = "Error";
    current = "";
    updateDisplay();
}
```

}

function addToHistory(calculation) {
const item = document.createElement("li");
item.textContent = calculation;

```
historyList.prepend(item);

// Keep only the latest 10 calculations
while (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
}
```

}

function clearHistory() {
historyList.innerHTML = "";
}

function toggleTheme() {
document.body.classList.toggle("light-mode");

```
const themeButton = document.getElementById("themeBtn");

if (document.body.classList.contains("light-mode")) {
    themeButton.textContent = "🌙";
} else {
    themeButton.textContent = "☀️";
}
```

}

// Keyboard support
document.addEventListener("keydown", function(event) {

```
const key = event.key;

if ("0123456789.+-*/()".includes(key)) {
    append(key);
}

else if (key === "Enter" || key === "=") {
    calculate();
}

else if (key === "Backspace") {
    deleteLast();
}

else if (key === "Escape") {
    clearDisplay();
}

else if (key === "%") {
    calculatePercentage();
}
```

});

updateDisplay();

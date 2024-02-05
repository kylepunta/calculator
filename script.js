let currentNumber = 0;
let firstNumber = 0;
let lastNumber = 0;
let currentOperator = 'none';
let operatorSymbol = '';
let result = 0;

function add(firstNumber, lastNumber){
    return firstNumber + lastNumber;
};

function subtract(firstNumber, lastNumber){
    return firstNumber - lastNumber;
};

function multiply(firstNumber, lastNumber){
    return firstNumber * lastNumber;
};

function divide(firstNumber, lastNumber){
    if (lastNumber == 0) {
        return 0
    }
    return firstNumber / lastNumber;
};

function getRemainder(firstNumber, lastNumber){
    return firstNumber % lastNumber;
};

function operate(firstNumber, lastNumber, operator){
    let result = 0;
    firstNumber = parseFloat(firstNumber);
    lastNumber = parseFloat(lastNumber);

    switch (operator) {
        case 'add':
                    result = add(firstNumber, lastNumber);
                    break;
        case 'subtract':
                    result = subtract(firstNumber, lastNumber);
                    break;
        case 'multiply':
                    result = multiply(firstNumber, lastNumber);
                    break;
        case 'divide':
                    result = divide(firstNumber, lastNumber);
                    break;
        case 'modulo':
                    result = getRemainder(firstNumber, lastNumber);
                    break;
    };
    if (result % 1.0 != 0) {
        result = result.toFixed(1);
        return result;
    }
    else {
        return parseInt(result);
    };
};

let display = document.querySelector('.value');
let operands = document.querySelectorAll('.operand');
let operators = document.querySelectorAll('.operator');
let operateButton = document.querySelector('.operate');
let reset = document.querySelector('.reset');
let clearEntry = document.querySelector('.remove');
let decimalButton = document.querySelector('.decimal');
let modulo = document.querySelector('.modulo');

display.textContent = 0;

console.log("Current Number: " + currentNumber);
console.log("First Number " + firstNumber);
console.log("Last Number " + lastNumber);
console.log("Current Operator " + currentOperator);
console.log("Result " + result);

operands.forEach((operand) => {
    operand.addEventListener('click', () => {
        if (result == 0) {
            if (currentNumber == 0) {
                currentNumber = operand.textContent;
                display.textContent = currentNumber;
            }
            else {
                currentNumber += operand.textContent;
                display.textContent = currentNumber;
            };    
        }
        else {
            if (firstNumber == 0 || currentNumber == 0) {
                firstNumber = result;
                currentNumber = operand.textContent;
                display.textContent = currentNumber;
            }
            else {
                currentNumber += operand.textContent;
                display.textContent = currentNumber;
            };
        };
    });
});

reset.addEventListener('click', () => {
    display.textContent = 0;
    currentNumber = 0;
    firstNumber = 0;
    lastNumber = 0;
    currentOperator = "none";
    result = 0;
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (firstNumber == 0) {
            firstNumber = currentNumber;
            currentNumber = 0;
            currentOperator = operator.id;
        }
        else {
            lastNumber = currentNumber;
            result = operate(firstNumber, lastNumber, currentOperator);
            display.textContent = result;
            currentOperator = operator.id;
            firstNumber = 0;
            lastNumber = 0;
            currentNumber = result; 
        };
    });
});

operateButton.addEventListener('click', () => {
    lastNumber = currentNumber;
    result = operate(firstNumber, lastNumber, currentOperator);
    if (currentOperator == "divide" && lastNumber == 0) {
        display.textContent = "ERROR";
        currentNumber = 0;
        firstNumber = 0;
        lastNumber = 0;
        currentOperator = "none";   
    }
    else {
        display.textContent = result;
        currentNumber = result;
        firstNumber = 0;
        lastNumber = 0;
        currentOperator = "none";   
    }
});

clearEntry.addEventListener('click', () => {
    if (currentNumber != "") {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
        currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    }
    else {
        if (currentOperator != "none") {
            currentOperator = "none";
            currentNumber = 0;
            display.textContent = display.textContent.slice(0, display.textContent.length - 3);
        }
        else {
            currentNumber = 0;
        };
    };
});

decimalButton.addEventListener('click', () => {
    display.textContent += ".";
    currentNumber += ".";
});
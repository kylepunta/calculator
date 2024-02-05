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

operands.forEach((operand) => {
    operand.addEventListener('click', () => {
        if (firstNumber != 0 && currentOperator == "none") {
            if (firstNumber == result) {
                firstNumber = operand.textContent;
                display.textContent = firstNumber;
            }
            else {
                firstNumber += operand.textContent;
                display.textContent = firstNumber;
            };
        }
        else if (firstNumber == 0) {
            if (display.textContent == 0) {
                firstNumber = operand.textContent;
                display.textContent = firstNumber;
            }
            else {
                firstNumber += operand.textContent;
                display.textContent = firstNumber;
            };
        }
        else {
            if (lastNumber == 0) {
                lastNumber = operand.textContent
                display.textContent = lastNumber;
            }
            else {
                lastNumber += operand.textContent;
                display.textContent = lastNumber;
            };
        };
    });
});

reset.addEventListener('click', () => {
    display.textContent = 0;
    firstNumber = 0;
    lastNumber = 0;
    currentOperator = "none";
    result = 0;
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (lastNumber == 0) {
            currentOperator = operator.id;
        }
        else {
            result = operate(firstNumber, lastNumber, currentOperator);
            display.textContent = result;
            firstNumber = result;
            currentOperator = operator.id;
            lastNumber = 0;
        };
    });
});

operateButton.addEventListener('click', () => {
    result = operate(firstNumber, lastNumber, currentOperator);
    display.textContent = result;
    firstNumber = result;
    currentOperator = "none";
    lastNumber = 0;
});

clearEntry.addEventListener('click', () => {
    if (lastNumber == 0) {
        if (firstNumber != "") {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
            firstNumber = display.textContent;
            if (firstNumber == "") {
                firstNumber = 0;
                display.textContent = firstNumber;
            };   
        };
    }
    else {
        if (lastNumber != "") {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
            lastNumber = display.textContent;
            if (lastNumber == "") {
                lastNumber = 0;
                display.textContent = lastNumber;
            };    
        };
    };
});

decimalButton.addEventListener('click', () => {
    if (lastNumber == 0) {
        if (display.textContent.charAt(display.textContent.length - 1) != ".") {
            firstNumber += ".";
            display.textContent += ".";
        }; 
    }
    else {
        if (display.textContent.charAt(display.textContent.length - 1) != ".") {
            lastNumber += ".";
            display.textContent += ".";
        };
    };
});
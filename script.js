let numberOne = 0;
let numberTwo = 0;
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

display.textContent = 0;

operands.forEach((operand) => {
    operand.addEventListener('click', () => {
        if (numberOne != 0 && currentOperator == "none") {
            if (numberOne == result) {
                numberOne = operand.textContent;
                display.textContent = numberOne;
            }
            else {
                numberOne += operand.textContent;
                display.textContent = numberOne;
            };
        }
        else if (numberOne == 0) {
            if (display.textContent == 0 || display.textContent == "ERROR") {
                numberOne = operand.textContent;
                display.textContent = numberOne;
            }
            else {
                numberOne += operand.textContent;
                display.textContent = numberOne;
            };
        }
        else {
            if (numberTwo == 0) {
                numberTwo = operand.textContent
                display.textContent = numberTwo;
            }
            else {
                numberTwo += operand.textContent;
                display.textContent = numberTwo;
            };
        };
    });
});

reset.addEventListener('click', () => {
    display.textContent = 0;
    numberOne = 0;
    numberTwo = 0;
    currentOperator = "none";
    result = 0;
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (numberTwo == 0) {
            currentOperator = operator.id;
        }
        else {
            if (currentOperator == "divide" && numberTwo == 0) {
                display.textContent = "ERROR";
                result = 0;
                numberOne = 0;
                numberTwo = 0;
                currentOperator = "none";
            }
            else {
                result = operate(numberOne, numberTwo, currentOperator);
                display.textContent = result;
                numberOne = result;
                currentOperator = operator.id;
                numberTwo = 0;    
            };
        };
    });
});

operateButton.addEventListener('click', () => {
    if (currentOperator == "divide" && numberTwo == 0) {
        display.textContent = "ERROR";
        result = 0;
        numberOne = 0;
        numberTwo = 0;
        currentOperator = "none";
    }
    else {
        result = operate(numberOne, numberTwo, currentOperator);
        display.textContent = result;
        numberOne = result;
        currentOperator = "none";
        numberTwo = 0;
    };
});

clearEntry.addEventListener('click', () => {
    if (numberTwo == 0) {
        if (numberOne != "") {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
            numberOne = display.textContent;
            if (numberOne == "") {
                numberOne = 0;
                display.textContent = numberOne;
            };   
        };
    }
    else {
        if (numberTwo != "") {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
            numberTwo = display.textContent;
            if (numberTwo == "") {
                numberTwo = 0;
                display.textContent = numberTwo;
            };    
        };
    };
});

decimalButton.addEventListener('click', () => {
    if (numberTwo == 0) {
        if (display.textContent.charAt(display.textContent.length - 1) != ".") {
            numberOne += ".";
            display.textContent += ".";
        }; 
    }
    else {
        if (display.textContent.charAt(display.textContent.length - 1) != ".") {
            numberTwo += ".";
            display.textContent += ".";
        };
    };
});
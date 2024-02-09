function add(numberOne, numberTwo){
    return numberOne + numberTwo;
};

function subtract(numberOne, numberTwo){
    return numberOne - numberTwo;
};

function multiply(numberOne, numberTwo){
    return numberOne * numberTwo;
};

function divide(numberOne, numberTwo){
    return numberOne / numberTwo;
};

function getRemainder(numberOne, numberTwo){
    return numberOne % numberTwo;
};

function operate(numberOne, numberTwo, currentOperator){

    var result = 0;
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);

    switch (currentOperator){
        case "add":
                    result = add(numberOne, numberTwo);
                    break;
        case "subtract":
                    result = subtract(numberOne, numberTwo);
                    break;
        case "multiply":
                    result = multiply(numberOne, numberTwo);
                    break;
        case "divide":
                    result = divide(numberOne, numberTwo);
                    break;
        case "modulo":
                    result = getRemainder(numberOne, numberTwo);
                    break;
        default:
                    return 0;
    };

    if (result % 1 != 0) {
        result = result.toFixed(2);
        return result;
    }
    else {
        return result;
    };
}

let previousNumber = "0";
let currentNumber = "0";
let result = "0";
let currentOperator = undefined;
let previousKey = undefined;
const decimal = ".";
let isDepressed = false;

let display = document.querySelector('[data-display]');
display.textContent = currentNumber;
let operands = document.querySelectorAll('[data-operand]');
let operators = document.querySelectorAll('[data-operator]');
let resetButton = document.querySelector('[data-reset]');
let deleteButton = document.querySelector('[data-delete]');
let equalsButton = document.querySelector('[data-equals]');
let decimalButton = document.querySelector('[data-decimal]');

function appendToDisplay(operand){
    display.textContent += operand;
};

function updateDisplay(operand){
    display.textContent = operand;
};

function chooseOperator(operator){
    switch (operator){
        case "add":
                    return "add";
        case "subtract":
                    return "subtract";
        case "multiply":
                    return "multiply";
        case "divide":
                    return "divide";
        case "modulo":
                    return "modulo";
    };
};

function reset(){
    previousNumber = "0";
    currentNumber = "0";
    result = "0";
    currentOperator = undefined;
};

function deleteEntry(){
    if (currentNumber.length == 1) {
        currentNumber = "0";
        updateDisplay(currentNumber);
    }
    else if (currentNumber != 0) {
        currentNumber = currentNumber.slice(0, currentNumber.length - 1);
        display.textContent = display.textContent.slice(0, display.textContent.length - 1); 
    };
};

let buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (isDepressed) {
            operators.forEach((operator) => {
                if (operator.classList.contains("isDepressed")) {
                        operator.classList.remove("isDepressed");
                        isDepressed = false;
                    };
                }
            );
        };
    });
});


operands.forEach((operand) => {
    operand.addEventListener('click', () => {
        if (previousKey == "operate") {
            reset();
            previousKey = "operand";
            currentNumber = operand.textContent;
            updateDisplay(operand.textContent);
        }
        else if (currentNumber === "0") {
            previousKey = "operand";
            currentNumber = operand.textContent;
            updateDisplay(operand.textContent);
        }
        else {
            previousKey = "operand";
            currentNumber += operand.textContent;
            appendToDisplay(operand.textContent);
        };
    });
});

equalsButton.addEventListener('click', () => {
    previousKey = "operate";
    result = operate(previousNumber, currentNumber, currentOperator);
    updateDisplay(result);
    previousNumber = result;
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (!isDepressed) {
            operator.classList.add('isDepressed');
            isDepressed = true;
        }
        if (previousKey != "operator") {
            if (previousKey == "operate") {
                previousKey = "operator";
                currentOperator = chooseOperator(operator.getAttribute('data-operator'));
                currentNumber = "0";
            }
            else if (previousNumber == "0"){
                previousKey = "operator";
                currentOperator = chooseOperator(operator.getAttribute('data-operator'));
                previousNumber = currentNumber;
                currentNumber = "0";
            }
            else {
                previousKey = "operator";
                currentOperator = chooseOperator(operator.getAttribute('data-operator'));
                result = operate(previousNumber, currentNumber, currentOperator);
                updateDisplay(result);
                previousNumber = currentNumber;
                currentNumber = "0";
            };
        };
    });
});

resetButton.addEventListener('click', () => {
    previousKey = "reset";
    reset();
    updateDisplay(currentNumber);
});

decimalButton.addEventListener('click', () => {
    previousKey = "operand";
    if (currentNumber.includes(".")) {
    }
    else if (previousKey == "operate") {
    }
    else {
        currentNumber += decimal;
        display.textContent += decimal;  
    };
});

deleteButton.addEventListener('click', () => {
    if (previousKey != "operate") {
        previousKey = "delete";
        deleteEntry();
    };
});
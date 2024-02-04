let currentNumber = 0;
let firstNumber = 0;
let lastNumber = 0;
let currentOperator = 'empty';
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
    return firstNumber / lastNumber;
};

function operate(firstNumber, lastNumber, operator){
    let result = 0;

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
    };
    return result;
};

let display = document.querySelector('.value');
let operands = document.querySelectorAll('.operand');
let operators = document.querySelectorAll('.operator');
let operateButton = document.querySelector('.operate');
let reset = document.querySelector('.reset');
let clearEntry = document.querySelector('.remove');
let decimal = document.querySelector('.decimal');
let modulo = document.querySelector('.modulo');

display.textContent = 0;

console.log(currentNumber);
console.log(firstNumber);
console.log(lastNumber);
console.log(currentOperator);


operands.forEach((operand) => {
    operand.addEventListener('click', () => {
        if (firstNumber == 0) {
            if (display.textContent == 0) {
                currentNumber = operand.textContent;
                display.textContent = currentNumber;
            }
            else {
                currentNumber += operand.textContent;
                display.textContent = currentNumber;    
            };
            console.log(currentNumber);
            console.log(firstNumber);
            console.log(lastNumber);
            console.log(currentOperator);

        }
        else {
            display.textContent += operand.textContent;
            console.log(currentNumber);
            console.log(firstNumber);
            console.log(lastNumber);
            console.log(currentOperator);

        };
    });
});

reset.addEventListener('click', () => {
    display.textContent = 0;
    currentNumber = 0;
    firstNumber = 0;
    lastNumber = 0;
    currentOperator = '';
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (firstNumber == 0) {
            firstNumber = currentNumber;
            currentNumber = 0;
            display.textContent += " " + operator.textContent + " ";
            currentOperator = operator.id;
            console.log(currentNumber);
            console.log(firstNumber);
            console.log(lastNumber);
            console.log(currentOperator);

        }
        else {
            lastNumber = currentNumber;
            result = operate(firstNumber, lastNumber, currentOperator);
            display.textContent = result;
            firstNumber = result;
            currentOperator = operator.id;
            console.log(currentNumber);
            console.log(firstNumber);
            console.log(lastNumber);
            console.log(currentOperator);

        };
    });
});

operateButton.addEventListener('click', () => {
    lastNumber = currentNumber;
    result = operate(firstNumber, lastNumber, currentOperator);
    display.textContent = result;
});
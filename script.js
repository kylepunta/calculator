let firstNumber = 0;
let lastNumber = 0;
let operator = '';

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
        case '+':
                    result = add(firstNumber, lastNumber);
                    break;
        case '-':
                    result = subtract(firstNumber, lastNumber);
                    break;
        case '*':
                    result = multiply(firstNumber, lastNumber);
                    break;
        case '/':
                    result = divide(firstNumber, lastNumber);
                    break;
    };
    return result;
};
// A calculator has a function for each data-button / data-operator:

// AC -> reset()
// CE -> deleteNumber()
// = -> operate()
// + -> add()
// - -> subtract()
// x -> multiply()
// / -> divide()
// % -> getRemainder()

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

// A calculator carries out an operation on two numbers at a time.

let previousNumber = "0";
let currentNumber = "0";
let result = "0";
let currentOperator = undefined;
let previousKey = undefined;
const decimal = ".";
let isNotDepressed = true;

// numberOne -> currentOperator -> numberTwo = operate(numberOne, numberTwo, currentOperator) -> result

// A function is needed to append the selected number to the display
// First, let's create reference our buttons and display with variables

let display = document.querySelector('[data-display]');
display.textContent = currentNumber;
let operands = document.querySelectorAll('[data-operand]');
let operators = document.querySelectorAll('[data-operator]');
let resetButton = document.querySelector('[data-reset]');
let deleteButton = document.querySelector('[data-delete]');
let equalsButton = document.querySelector('[data-equals]');
let decimalButton = document.querySelector('[data-decimal]');

// operands.forEach(operand => {
//     console.log(operand.getAttribute('data-operand'));
// });

// Now lets create the function we need to append the selected number to the display

function appendToDisplay(operand){
    // currentNumber += operand;
    display.textContent += operand;
};

function updateDisplay(operand){
    // currentNumber = operand;
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

        if (isNotDepressed) {

        }
        else {
            operators.forEach((operator) => {
                if (operator.classList.contains("isNotDepressed")) {
                    operator.classList.remove("isNotDepressed");
                    isNotDepressed = true;
                };
            });
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
            console.log("Previous Number: " + previousNumber);
            console.log("Current Number: " + currentNumber);
            console.log("Current Operator: " + currentOperator);
            console.log("Result: " + result);
            console.log(previousKey);
        }
        else if (currentNumber === "0") {
            previousKey = "operand";
            currentNumber = operand.textContent;
            updateDisplay(operand.textContent);
            console.log("Previous Number: " + previousNumber);
            console.log("Current Number: " + currentNumber);
            console.log("Current Operator: " + currentOperator);
            console.log("Result: " + result);
            console.log(previousKey);
        }
        else {
            previousKey = "operand";
            currentNumber += operand.textContent;
            appendToDisplay(operand.textContent);
            console.log("Previous Number: " + previousNumber);
            console.log("Current Number: " + currentNumber);
            console.log("Current Operator: " + currentOperator);
            console.log("Result: " + result);
            console.log(previousKey);
        };
    });
});

equalsButton.addEventListener('click', () => {
    previousKey = "operate";
    result = operate(previousNumber, currentNumber, currentOperator);
    updateDisplay(result);
    previousNumber = result;
    console.log("Previous Number: " + previousNumber);
    console.log("Current Number: " + currentNumber);
    console.log("Current Operator: " + currentOperator);
    console.log("Result: " + result);
    console.log(previousKey);
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (isNotDepressed) {
            operator.classList.add('isNotDepressed');
            isNotDepressed = false;
        }
        if (previousKey != "operator") {
            if (previousKey == "operate") {
                previousKey = "operator";
                currentOperator = chooseOperator(operator.getAttribute('data-operator'));
                currentNumber = "0";
                console.log("Previous Number: " + previousNumber);
                console.log("Current Number: " + currentNumber);
                console.log("Current Operator: " + currentOperator);
                console.log("Result: " + result);
                console.log(previousKey);
            }
            else if (previousNumber == "0"){
                previousKey = "operator";
                currentOperator = chooseOperator(operator.getAttribute('data-operator'));
                previousNumber = currentNumber;
                currentNumber = "0";
                console.log("Previous Number: " + previousNumber);
                console.log("Current Number: " + currentNumber);
                console.log("Current Operator: " + currentOperator);
                console.log("Result: " + result);
                console.log(previousKey);
            }
            else {
                previousKey = "operator";
                currentOperator = chooseOperator(operator.getAttribute('data-operator'));
                result = operate(previousNumber, currentNumber, currentOperator);
                updateDisplay(result);
                previousNumber = currentNumber;
                currentNumber = "0";
                console.log("Previous Number: " + previousNumber);
                console.log("Current Number: " + currentNumber);
                console.log("Current Operator: " + currentOperator);
                console.log("Result: " + result);
                console.log(previousKey);
            };
        };
    });
});

resetButton.addEventListener('click', () => {
    previousKey = "reset";
    reset();
    updateDisplay(currentNumber);
    console.log("Previous Number: " + previousNumber);
    console.log("Current Number: " + currentNumber);
    console.log("Current Operator: " + currentOperator);
    console.log("Result: " + result);
    console.log(previousKey);
});

decimalButton.addEventListener('click', () => {
    previousKey = "operand";
    if (currentNumber.includes(".")) {
        console.log("Already contains a decimal");
        console.log("Previous Number: " + previousNumber);
        console.log("Current Number: " + currentNumber);
        console.log("Current Operator: " + currentOperator);
        console.log("Result: " + result);    
    }
    else if (previousKey == "operate") {
        console.log("Cannot enter decimal");
    }
    else {
        currentNumber += decimal;
        display.textContent += decimal;  
        console.log("Previous Number: " + previousNumber);
        console.log("Current Number: " + currentNumber);
        console.log("Current Operator: " + currentOperator);
        console.log("Result: " + result);      
    };
});

deleteButton.addEventListener('click', () => {
    if (previousKey != "operate") {
        previousKey = "delete";
        deleteEntry();
        console.log("Previous Number: " + previousNumber);
        console.log("Current Number: " + currentNumber);
        console.log("Current Operator: " + currentOperator);
        console.log("Result: " + result);
        console.log(previousKey);    
    };
});
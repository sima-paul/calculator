//operations//

let add = function(arrCollection) {
    let sum = 0;

    for (let i = 0; i < arrCollection.length; i++) {
        sum += Number(arrCollection[i]);
    }

    return sum;
};


let division = function(arrCollection) {
    let div = Number(arrCollection[0]);

    for (let i = 1; i < arrCollection.length; i++) {
        div /= Number(arrCollection[i]);
    }

    return div;
};


let multi = function(arrCollection) {
    let mul = 1;

    for (let i = 0; i < arrCollection.length; i++) {
        mul *= Number(arrCollection[i]);
    }

    return mul;
};


let substract = function(arrCollection) {
    let sub = Number(arrCollection[0]);

    for (let i = 1; i < arrCollection.length; i++) {
        sub -= Number(arrCollection[i]);
    }

    return sub;
};


let modulo = function(arrCollection) {
    let mod = Number(arrCollection[0]);

    for (let i = 1; i < arrCollection.length; i++) {
        mod %= Number(arrCollection[i]);
    }

    return mod;
};


//variables//

let arrCollection = [];
let operatorCollection = [];

let firstNumber = "";
let secondNumber = "";
let operator = "";
let expressions = "";


//display//

let displayTwo = document.querySelector(".displayTwo");
let displayOne = document.querySelector(".displayOne");


//number buttons//

let numbers = document.querySelectorAll(".num");

for (let i = 0; i < numbers.length; i++) {

    numbers[i].addEventListener("click", function() {

        if (operator === "") {
            firstNumber += this.innerText;

        } else {
            secondNumber += this.innerText;
        }

        expressions += this.innerText;
        displayOne.innerText = expressions;

    });
}


//operations buttons//

let operations = document.querySelectorAll(".operation");

for (let i = 0; i < operations.length; i++) {

    operations[i].addEventListener("click", function() {

        if (firstNumber !== "") {
            arrCollection.push(firstNumber);
            firstNumber = "";
        }

        if (secondNumber !== "") {
            arrCollection.push(secondNumber);
            secondNumber = "";
        }

        operator = this.dataset.operation;

        operatorCollection.push(operator);

        expressions += operator;
        displayOne.innerText = expressions;

    });

}


//equal button//

let equal = document.querySelector("button:last-child");

equal.addEventListener("click", function() {

    if (secondNumber !== "") {
        arrCollection.push(secondNumber);
        secondNumber = "";
    }

    let numbersArray = arrCollection.map(Number);

    let operators = [...operatorCollection];


    // * / %

    for (let i = 0; i < operators.length; i++) {

        if (operators[i] === "*") {

            numbersArray[i] = multi([
                numbersArray[i],
                numbersArray[i + 1]
            ]);

            numbersArray.splice(i + 1, 1);
            operators.splice(i, 1);

            i--;
        }

        else if (operators[i] === "/") {

            numbersArray[i] = division([
                numbersArray[i],
                numbersArray[i + 1]
            ]);

            numbersArray.splice(i + 1, 1);
            operators.splice(i, 1);

            i--;
        }

        else if (operators[i] === "%") {

            numbersArray[i] = modulo([
                numbersArray[i],
                numbersArray[i + 1]
            ]);

            numbersArray.splice(i + 1, 1);
            operators.splice(i, 1);

            i--;
        }
    }


    // + -

    let result = numbersArray[0];

    for (let i = 0; i < operators.length; i++) {

        if (operators[i] === "+") {

            result = add([
                result,
                numbersArray[i + 1]
            ]);

        }

        else if (operators[i] === "-") {

            result = substract([
                result,
                numbersArray[i + 1]
            ]);

        }
    }


    displayTwo.innerText = result;

});


// AC button //

let AC = document.querySelector(".AC");

AC.addEventListener("click", function() {

    arrCollection = [];
    operatorCollection = [];

    firstNumber = "";
    secondNumber = "";
    operator = "";
    expressions = "";

    displayOne.innerText = "";
    displayTwo.innerText = "";

});

// delete button //

let del = document.querySelector(".del");

del.addEventListener("click", function() {

    if (expressions === "") {
        return;
    }

    expressions = expressions.slice(0, -1);

    arrCollection = [];
    operatorCollection = [];

    firstNumber = "";
    secondNumber = "";
    operator = "";

    if (expressions === "") {

        displayOne.innerText = "";
        return;
    }

    let parts = expressions.split(/([+\-*/%])/);

    parts = parts.filter(function(part) {
        return part !== "";
    });

    for (let i = 0; i < parts.length; i++) {

        if (
            parts[i] === "+" ||
            parts[i] === "-" ||
            parts[i] === "*" ||
            parts[i] === "/" ||
            parts[i] === "%"
        ) {

            operatorCollection.push(parts[i]);

        } else {

            arrCollection.push(parts[i]);

        }
    }

    let lastCharacter = expressions[expressions.length - 1];

    if (
        lastCharacter === "+" ||
        lastCharacter === "-" ||
        lastCharacter === "*" ||
        lastCharacter === "/" ||
        lastCharacter === "%"
    ) {

        operator = lastCharacter;

    }

    else if (operatorCollection.length > 0) {

        operator = operatorCollection[
            operatorCollection.length - 1
        ];

        secondNumber = arrCollection.pop();

    }

    else {

        firstNumber = arrCollection.pop();

    }


    displayOne.innerText = expressions;

});
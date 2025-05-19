var totalButtons = document.querySelectorAll("button").length;

let numbers_operators = [];
let currentNumber = true;
let valueStr = "0"
let displayStr = ""

function handleInput(value, type){

    if(type === "number"){
        if(value === "." && valueStr.includes(".")) return;

        displayStr = displayStr + value;

        valueStr = valueStr + value;

        var displayElem = document.getElementById("display_value");
        displayElem.value = displayStr;
        displayElem.scrollLeft = displayElem.scrollWidth;

        currentNumber = true;
    }

    else if(type === "operator" && currentNumber){
        
        displayStr = displayStr + value;

        valueStr = valueStr + value;

        displayElem = document.getElementById("display_value");
        displayElem.value = displayStr;
        displayElem.scrollLeft = displayElem.scrollWidth;

        currentNumber = false;

        const match = valueStr.match(/^(\d+(\.\d+)?)([+\-*/])$/);
        if(match){
            numbers_operators.push(parseFloat(match[1]));
            numbers_operators.push(match[3]);
            valueStr = "";
        }
    }

    else if(displayStr && type === "equals"){

        displayStr = displayStr + "Enter"
        document.getElementById("display_value").value = displayStr;

        numbers_operators.push(parseFloat(valueStr));
        numbers_operators.push("Enter");
        // console.log(numbers_operators);

        valueStr = "";

        document.getElementById("display_value").value = calculate(numbers_operators)[numbers_operators.length-2];

    }
}

function applyOperation(a, op, b) {
  switch (op) {
    case '*': return a * b;
    case '/': return a / b;
    case '+': return a + b;
    case '-': return a - b;
  }
}

function calculate(arr){

    for(const op of ['/', "*"]){
        
        for(let i = 0; i < arr.length; i++){
            if(arr[i] == op){

                const result = applyOperation(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i-1, 3, result);

                i = Math.max(i - 2, 0)
            }
        }

    }

    for(let i = 0; i < arr.length; i++){

        if(arr[i] == "+"){

            const result = applyOperation(arr[i-1], arr[i], arr[i+1]);
            arr.splice(i-1, 3, result);

            i = Math.max(i-2, 0);
        }
        else if(arr[i] == "-"){

            const result = applyOperation(arr[i-1], arr[i], arr[i+1]);
            arr.splice(i-1, 3, result);

            i = Math.max(i-2, 0);
        }
    }
    
    return arr;

}

document.addEventListener("keydown", function(event){

    const key = event.key;
    const matchedButton = document.querySelector(`button[value="${key}"]`);

    if(matchedButton && matchedButton.classList.contains("V")){
        handleInput(key, "number");
    }else if(matchedButton && matchedButton.classList.contains("operator")){
        handleInput(key, "operator");
    }else if(key === "Enter"){
        handleInput(key, "equals");
    }

});

for(let i = 0; i < totalButtons; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){

        const value = this.value;

        if(this.classList.contains("V")){
            handleInput(value, "number");
        }else if(this.classList.contains("operator")){
            handleInput(value, "operator");
        }else if(this.classList.contains("equals")){
            handleInput(value, "equals");
        }

    })
}

// let numbers_operators = [2, '+', 9, '*', 8, '+', 3, '-', 885, '+', 7, '*', 52, 'Enter', 57, '+', 2, 'Enter'];

// let numbers_operators1 = [2 , '+', 3, '+', 6, 'Enter', 2, 'Enter', 5, 'Enter'] // 11 
// let numbers_operators2 = [2, '+', 3, '+', 6, 'Enter', 2, '+', 3, 'Enter']; // 5
// Need to add chained evaluation feature

// let lastOperator = null;
// let lastOperand = null;


// for(var i = 0 ; i < numbers_operators1.length ; i++){
//     if(typeof numbers_operators1[i] === "string" && (numbers_operators1[i] == "+" || numbers_operators1[i] == "-" || numbers_operators1[i] == "/" || numbers_operators1[i] == "*") && 
//     typeof numbers_operators1[i+1] === "number"){
//         lastOperand = numbers_operators1[i];
//         lastOperator = numbers_operators1[i+1];
//     }
// }

// console.log(lastOperator);
// console.log(lastOperand);
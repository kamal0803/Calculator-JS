let dis_value = "";
let numbers = [];
let operators = [];

var totalButtons = document.querySelectorAll("button").length;

function clearCalculator(){

    dis_value = "";
    numbers = [];
    operators = [];

    document.getElementById("display_value").value = "";

}
function displayValueSep(dis_value){

    numbers = dis_value.match(/\d+(\.\d+)?/g).map(parseFloat);
    operators = dis_value.match(/[+\-*/]/g) || [];
    
    return numbers, operators;
}

function calculateEverything(numbers, operators) {
      
    for(let i = 0; i < operators.length; i++){
        if (operators[i] == "/"){
            numbers[i] = numbers[i]/numbers[i+1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }
    }

    for(let i = 0; i < operators.length; i++){
        if (operators[i] == "*"){
            numbers[i] = numbers[i]*numbers[i+1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }
    }
  
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == "+") {
            numbers[i] = numbers[i] + numbers[i + 1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }else if(operators[i] == "-"){
            numbers[i] = numbers[i] - numbers[i + 1];
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }
    }

    return numbers;

}

for(var i = 0; i<totalButtons; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        if(this.classList.contains("operator") || this.classList.contains("V")){
            dis_value = dis_value + this.value;

            let displayElem = document.getElementById("display_value");
            displayElem.value = dis_value;
            displayElem.scrollLeft = displayElem.scrollWidth;

        }else if(this.classList.contains("clear")){
            clearCalculator();
        }else if(this.classList.contains("equals")){
            numbers, operators = displayValueSep(dis_value);
            answer = calculateEverything(numbers, operators);
            document.getElementById("display_value").value = answer;

        }
    });
};

document.addEventListener("keydown", function(event){
    
    const matchedButton = document.querySelector(`button[value="${event.key}"]`);
    
    if(matchedButton && (matchedButton.classList.contains("operator") || matchedButton.classList.contains("V"))){
        dis_value = dis_value + event.key;

        displayElem = document.getElementById("display_value");
        displayElem.value = dis_value;
        displayElem.scrollLeft = displayElem.scrollWidth;
    }else if(matchedButton && matchedButton.classList.contains("clear")){
        clearCalculator();
    }else if(matchedButton && matchedButton.classList.contains("equals")){
        numbers, operators = displayValueSep(dis_value);
        answer = calculateEverything(numbers, operators);
        document.getElementById("display_value").value = answer;

    }else if(!matchedButton && event.key == "Enter"){
        numbers, operators = displayValueSep(dis_value);
        answer = calculateEverything(numbers, operators);
        document.getElementById("display_value").value = answer;

    }

});

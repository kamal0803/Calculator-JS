let dis_value = "";
let numbers = [];
let operators = [];

function clearCalculator(){

    dis_value = "";
    numbers = [];
    operators = [];
    $("#display_value").val("");

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

$("button").on("click", function() {
    if ($(this).hasClass("equals")){

        numbers, operators = displayValueSep(dis_value);
        answer = calculateEverything(numbers, operators);
        $("#display_value").val(answer);

    }else if($(this).hasClass("clear")){
        clearCalculator();
    }else if($(this).hasClass("V") || $(this).hasClass("operator")){
        dis_value = dis_value + $(this).val();

        $("#display_value").val(dis_value)[0].scrollLeft = $("#display_value")[0].scrollWidth;
    }

})

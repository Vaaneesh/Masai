function multiply(a, b) {
    return a * b;
}
function multiplyNumbers(num1, num2) {
    return multiply.apply(null, [num1, num2]);
}
let product = multiplyNumbers(2,3);
console.log(product); 

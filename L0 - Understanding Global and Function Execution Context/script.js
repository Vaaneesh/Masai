let age = 22;
function displayAge() {
    console.log("Current age:", age);
}
function changeAge(newAge) {
    age = newAge;
    console.log("Age updated to:", age);
}
displayAge();
changeAge(30); 
displayAge();

function setTimeoutGreeting(person) {
    function greet() {
        console.log("Hello, "+this.name);
    }
    setTimeout(greet.bind(person), 1000); 
}
let user = {
    name: "Vaaneesh"
};
setTimeoutGreeting(user);

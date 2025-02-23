function personInfo() {
    console.log("Name: "+this.name+", Age: "+this.age);
}
let person = {
    name: "Vaaneesh",
    age: 22
};
personInfo.call(person);

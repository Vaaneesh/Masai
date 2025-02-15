function outerFunction() {
    let message="Hey!";
    return function innerFunction() {
      console.log(message);
    };
  }
const storedFunction=outerFunction();
storedFunction();
    
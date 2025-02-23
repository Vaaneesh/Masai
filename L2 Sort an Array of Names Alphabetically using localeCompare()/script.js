function sortNames(arr) {
    return arr.sort((a, b) => a.localeCompare(b));
}
const names=["Charlie","Alice","Bob"];
const sortedNames = sortNames(names);
console.log(sortedNames); 

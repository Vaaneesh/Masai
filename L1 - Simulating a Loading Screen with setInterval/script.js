const loading=setInterval(() => {
    console.log("LOADING.......");
}, 1000);
setTimeout(() => {
    clearInterval(loading);
    console.log("Loaded successfully!")
}, 5000);
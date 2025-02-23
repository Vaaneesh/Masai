function registerUser(callback) {
    setTimeout(() => {
        console.log("User registered successfully.");
        callback();
    }, 1000);
}
function sendVerification(callback) {
    setTimeout(() => {
        console.log("Verification email sent successfully.");
        callback();
    }, 1000);
}
function loginUser(callback) {
    setTimeout(() => {
        console.log("User logged in successfully.");
        callback();
    }, 1000);
}
function displayWelcomeMessage(callback) {
    setTimeout(() => {
        console.log("Welcome to our platform!");
        callback();
    }, 1000);
}
registerUser((err) => {
    if (err) return console.error("Error:", err);
    sendVerification((err) => {
        if (err) return console.error("Error:", err);
        loginUser((err) => {
            if (err) return console.error("Error:", err);
            displayWelcomeMessage((err) => {
                if (err) return console.error("Error:", err);
                console.log("All steps completed successfully.");
            });
        });
    });
});

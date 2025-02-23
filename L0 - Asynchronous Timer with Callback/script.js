function timer(duration, onComplete) {
    setTimeout(() => {
        const message = `Timer of ${duration} ms finished`;
        onComplete(message);
    }, duration);
}
timer(3000, (message) => {
    console.log(message);
});

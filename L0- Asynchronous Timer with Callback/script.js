function timer(duration,onComplete){
    setTimeout(() => {
        const msg=`Timer of ${duration}ms finished`;
        onComplete(msg);
    }, duration);
}
timer(3000,(msg)=>{
    console.log(msg);
});
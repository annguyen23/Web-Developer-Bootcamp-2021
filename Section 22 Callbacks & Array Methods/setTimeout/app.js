console.log("HELLO!!!...") //run first
setTimeout(() => {
    console.log("...are you still there?") //run second, but wait for 3 seconds
}, 3000)

console.log("GOODBYE!!") //run third, but print before "...are you still there?"

// keep running every 2 seconds
const id = setInterval(() => {
    console.log(Math.random())
}, 2000);

// clearInterval(id);
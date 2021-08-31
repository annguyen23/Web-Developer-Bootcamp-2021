// const password = prompt("Enter a password");

// if (password.length >= 6) {
//     if (password.indexOf(" ") === -1) {
//         console.log("valid password!");
//     } else {
//         console.log("no space please");
//     }
// } else {
//     console.log("too short");
// }

// if (password) {
//     console.log("Truthy");
// } else {
//     console.log("Falsy");
// }

let maximum = parseInt(prompt("Enter a max num"));
while (!maximum) {
    maximum = parseInt(prompt("Enter a max num"));
}
let target = Math.floor(Math.random() * maximum) + 1;
let guess = parseInt(prompt("Enter a guess"));
while (guess !== target) {
    if (guess > target) {
        guess = parseInt(prompt("too high"));
    } else {
        guess = parseInt(prompt("too low"));
    }
}

console.log(target);

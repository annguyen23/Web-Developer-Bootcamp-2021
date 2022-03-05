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

// let maximum = parseInt(prompt("Enter a max num"));
// while (!maximum) {
//     maximum = parseInt(prompt("Enter a max num"));
// }
// let target = Math.floor(Math.random() * maximum) + 1;
// let guess = parseInt(prompt("Enter a guess"));
// while (parseInt(guess) !== target) {
//     if (guess === 'q') break;
//     if (guess > target) {
//         guess = prompt("too high");
//     } else {
//         guess = prompt("too low");
//     }
// }

// console.log(target);

// const testScores = {
//     kim: 10,
//     han: 54,
//     hen: 5
// };
// for (let score in testScores) {
//     console.log(`${score}: ${testScores[score]}`);
// }


// let input = prompt("What would you like to do?");
// const list = [];
// while (input !== 'quit') {
//     if (input === 'new') {
//         input = prompt("new Todo: ");
//         list.push(input);
//     } else if (input === 'list') {
//         console.log("***************");
//         for (let i = 0; i < list.length; i++) {
//             console.log(`${i}: ${list[i]}`);
//         }
//         console.log("***************");
//     } else if (input === 'delete') {
//         input = parseInt(prompt("What Todo do you want to delete? Enter the index "));
//         if (Number.isNaN(input)) {
//             continue;
//         }
//         console.log(`Ok, deleted ${list.splice(input, 1)}`);
//     }
//     input = prompt("What would you like to do?");
// }
// console.log("Quit Todo list");

function sing(note) {
    console.log(note);
}
sing("Do");

const input = document.querySelector('input');
const h1 = document.querySelector('h1');

// input.addEventListener('change', function (e) {
//     console.log("CASKDJASKJHD")
// })

// option 'change' to check if the input is changed
// enter, change values and leave the input

// change right away for each character added/removed
input.addEventListener('input', function (e) {
    h1.innerText = input.value;
})
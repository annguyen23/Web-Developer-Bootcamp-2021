const btn = document.querySelector('#v2');

//if clicked button, print to console
btn.onclick = function () {
    console.log("YOU CLICKED ME!")
    console.log("I HOPE IT WORKED!!")
}

function scream() {
    console.log("AAAAAHHHHH");
    console.log("STOP TOUCHING ME!")
}

//if hover (mouse enters), print scream()
btn.onmouseenter = scream;


document.querySelector('h1').onclick = () => {
    alert('you clicked the h1!')
}


const btn3 = document.querySelector('#v3');
btn3.addEventListener('click', function () {
    alert("CLICKED!");
})

function twist() {
    console.log("TWIST!")
}
function shout() {
    console.log("SHOUT!")
}

const tasButton = document.querySelector('#tas');

// the 2nd one will run, but not the first
// tasButton.onclick = twist;
// tasButton.onclick = shout;


// { once: true } makes the event runs only once
tasButton.addEventListener('click', twist, { once: true })
tasButton.addEventListener('click', shout)

const button = document.querySelector('button');
const h1 = document.querySelector('h1');

button.addEventListener('click', function () {
    const newColor = makeRandColor();
    document.body.style.backgroundColor = newColor;
    h1.innerText = newColor;
})

const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const sum = r + g + b;
    h1.style.color = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    return `rgb(${r}, ${g}, ${b})`;
}


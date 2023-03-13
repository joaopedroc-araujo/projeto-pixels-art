const colorPallete = document.getElementById('color-palette');const randomColorButton = document.createElement('button');
const newButton = () => {
    randomColorButton.innerHTML = 'Cores aleatórias';
    randomColorButton.id = 'button-random-color'
    colorPallete.appendChild(randomColorButton);
    randomColorButton.style = 'display: inline-box; margin: 10px; verticalAlign: 190% ';
};

randomColorButton.addEventListener('click', btnColor);
const colors = document.querySelectorAll('.color');

const firstColor = document.querySelector('.color');
firstColor.style.backgroundColor = 'black';

function btnColor() {
    for (let index = 1; index < colors.length; index += 1) {
        let red = parseInt(Math.random() * 255);
        let green = parseInt(Math.random() * 255);
        let blue = parseInt(Math.random() * 255);
        let colorResult = `rgb(${red}, ${green}, ${blue})`;
        colors[index].style.backgroundColor = `${colorResult}`;
    }
};

newButton();
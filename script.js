const colorPallete = document.getElementById('color-palette');
const randomColorButton = document.createElement('button');

const newButton = () => {
    randomColorButton.innerHTML = 'Cores aleatórias';
    randomColorButton.id = 'button-random-color'
    colorPallete.appendChild(randomColorButton);
    randomColorButton.style.margin = '10px';
    randomColorButton.style.verticalAlign = '230%';
};

randomColorButton.addEventListener('click', btnColor);
const colors = document.querySelectorAll('.color');

const firstColor = document.querySelector('.color');
firstColor.classList.add('selected');
firstColor.style.backgroundColor = 'black';
const arrayOfColors = [];

function btnColor() {
    for (let index = 1; index < colors.length; index += 1) {
        let red = parseInt(Math.random() * 255);
        let green = parseInt(Math.random() * 255);
        let blue = parseInt(Math.random() * 255);
        let colorResult = `rgb(${red}, ${green}, ${blue})`;
        colors[index].style.backgroundColor = colorResult;
        arrayOfColors.push(colorResult)[index];
    }
    localStorage.setItem('colorPallete', JSON.stringify(arrayOfColors));
};

const newBoard = () => {
    const firstPixel = document.getElementById('pixel-board');
    firstPixel.style.display = 'grid';
    firstPixel.style.gridTemplateColumns = 'repeat(5, 40px)';
    firstPixel.style.gridTemplateRows = 'repeat(5, 40px)';

    for (let index = 0; index < 25; index += 1) {
        const pixels = document.createElement('div');
        pixels.className = 'pixel';
        firstPixel.appendChild(pixels);
        pixels.style.display = 'inline-grid';
        pixels.style.border = 'solid 1px black';
        pixels.style.width = '40px';
        pixels.style.height = '40px';
        pixels.style.backgroundColor = 'white';
        pixels.style.alignContent = 'center';
    }
};

newBoard();
newButton();
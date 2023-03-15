const colorPalette = document.getElementById('color-palette');
const randomColorButton = document.createElement('button');

const newButton = () => {
    randomColorButton.innerHTML = 'Cores aleatórias';
    randomColorButton.id = 'button-random-color';
    colorPalette.appendChild(randomColorButton);
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
        const red = parseInt(Math.random() * 255);
        const green = parseInt(Math.random() * 255);
        const blue = parseInt(Math.random() * 255);
        const colorResult = `rgb(${red}, ${green}, ${blue})`;
        colors[index].style.backgroundColor = colorResult;

        if (index >= colors.length - 3) {
            arrayOfColors.push(colorResult);
        }
    }
    localStorage.setItem('colorPalette', JSON.stringify(arrayOfColors.slice(-3)));
    savedColors();
};

const savedColors = () => {
    let localSavedColors = JSON.parse(localStorage.getItem('colorPalette'));
    if (localSavedColors && localSavedColors.length === 3) {
        for (let index = 0; index < 3; index += 1) {
            colors[colors.length - 3 + index].style.backgroundColor = localSavedColors[index];
        }
    }
};

window.onload = () => {
    newButton();
    newBoard();
    savedColors();
    changeColors();
    resetBtn();
}

const firstPixel = document.getElementById('pixel-board');

const newBoard = () => {
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
        firstPixel.style.marginLeft = '120px';
        firstPixel.style.marginTop = '60px';
    }
};

//firstColors e colors -> palheta de cores
//pixels -> os grids

const colorsSelect = document.getElementsByClassName('color');
const pixels = document.getElementsByClassName('pixel');

const changeColors = () => {
    for (let index = 0; index < colorsSelect.length; index += 1) {
        colorsSelect[index].addEventListener('click', (event) => {
            const colorSelected = document.querySelector('.selected');
            if (colorSelected) {
                colorSelected.classList.remove('selected');
            }
            event.target.classList.add('selected');
        })
    }
    for (let index = 0; index < pixels.length; index += 1) {
        pixels[index].addEventListener('click', (event) => {
            const colorsSelect = document.querySelector('.selected');
            if (colorsSelect) {
                const colorSelected = window.getComputedStyle(colorsSelect).getPropertyValue("background-color"); // Obrigado StackOverFlow e documentação do MDN (todas aquelas horas lendo para entender valeram a pena!).
                event.target.style.backgroundColor = colorSelected;
            }
        })
    }
};

const resetBtn = () => {
    const newButton = document.getElementById('reset-button');
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Limpar';
    resetButton.id = 'clear-board';
    newButton.appendChild(resetButton);
    resetButton.addEventListener('click', resetBoard);
    function resetBoard() {
        for (let index = 0; index < pixels.length; index += 1) {
            pixels[index].style.backgroundColor = 'rgb(255, 255, 255)';
        }
    }
};

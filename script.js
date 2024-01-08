/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-use-before-define */
/* eslint-disable radix */
const colorPalette = document.getElementById('color-palette');
const whiteColor = document.createElement('li');
const randomColorButton = document.createElement('button');
let gridValue = 5;
const errorMessage = 'Por favor, insira um número entre 5 e 20!';
const colors = document.querySelectorAll('.color');
const firstColor = document.querySelector('.color');
firstColor.classList.add('selected');
firstColor.style.backgroundColor = 'black';
const arrayOfColors = [];

whiteColor.className = 'color';
whiteColor.style.backgroundColor = 'white';

colorPalette.appendChild(whiteColor);

const newButton = () => {
  randomColorButton.innerHTML = 'Cores aleatórias';
  randomColorButton.id = 'button-random-color';
  colorPalette.appendChild(randomColorButton);
  randomColorButton.style.margin = '10px';
  randomColorButton.style.verticalAlign = '230%';
};

const savedColors = () => {
  const localSavedColors = JSON.parse(localStorage.getItem('colorPalette'));
  if (localSavedColors && localSavedColors.length === 3) {
    for (let index = 0; index < 3; index += 1) {
      colors[colors.length - 3 + index].style.backgroundColor = localSavedColors[index];
    }
  }
};

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
}

randomColorButton.addEventListener('click', btnColor);

const firstPixel = document.getElementById('pixel-board');

const newBoard = (gridSize) => {
  // Limpe o grid atual
  firstPixel.innerHTML = '';

  // Atualize o grid
  firstPixel.className = 'firstPixel';
  firstPixel.style.display = 'grid';
  firstPixel.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
  firstPixel.style.gridTemplateRows = `repeat(${gridSize}, 40px)`;

  // Crie os novos pixels
  for (let index = 0; index < gridSize * gridSize; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    firstPixel.appendChild(pixel);
    pixel.style.display = 'inline-grid';
    pixel.style.border = '1px solid black';
    pixel.style.width = '40px';
    pixel.style.height = '40px';
    pixel.style.backgroundColor = 'white';
  }
  firstPixel.style.marginTop = '10px';
  firstPixel.style.justifyContent = 'center';
  firstPixel.style.alignItems = 'center';

  // Adicione ouvintes de eventos aos novos pixels
  const pixels = document.getElementsByClassName('pixel');
  changeColors(pixels);
};

// firstColors e colors -> palheta de cores
// pixels -> os grids

const colorsSelect = document.getElementsByClassName('color');
const pixels = document.getElementsByClassName('pixel');

// eslint-disable-next-line max-lines-per-function
const changeColors = (pixels) => {
  for (let index = 0; index < colorsSelect.length; index += 1) {
    colorsSelect[index].addEventListener('click', (event) => {
      const colorSelected = document.querySelector('.selected');
      if (colorSelected) {
        colorSelected.classList.remove('selected');
        colorSelected.style.border = '';
      }
      event.target.classList.add('selected');
      event.target.style.border = '3px solid white';
    });
  }

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', (event) => {
      const colorsSelect = document.querySelector('.selected');
      if (colorsSelect) {
        const colorSelected = window.getComputedStyle(colorsSelect)
          .getPropertyValue('background-color');
        event.target.style.backgroundColor = colorSelected;
        saveActualGrid();
      }
    });
  }
};

const resetBtn = () => {
  const newButton = document.getElementById('reset-button');
  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'Limpar';
  resetButton.id = 'clear-board';
  newButton.appendChild(resetButton);
  function resetBoard() {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = 'rgb(255, 255, 255)';
    }
  }
  resetButton.addEventListener('click', resetBoard);
  resetButton.style.marginLeft = '26%';
  resetButton.style.display = 'inline-flex';
  resetButton.style.marginTop = '0';
};

const saveActualGrid = () => {
  const colorsInformation = [];
  for (let index = 0; index < pixels.length; index += 1) { // guarda na constante color os estilos CSS atribuidos a pixels[index] (feito pelo getComputedStyle) e 'filtra' qual propriedade é pedida (getPropertyValue).
    const colorInfo = window.getComputedStyle(pixels[index]).getPropertyValue('background-color'); // Nota: como é uma propriedade CSS, a escrita correta é 'background-color' e não backgroundColor.
    colorsInformation[index] = colorInfo; // Popula o objeto com as informações de cor e do index (pixel atual).
  }
  localStorage.setItem('pixelBoard', JSON.stringify(colorsInformation));
  // transforma o objeto em string para ser possivel salvar.
};

const recoverGrid = () => {
  let colorsInformation = [];
  const recoveredGrid = JSON.parse(localStorage.getItem('pixelBoard'));
  colorsInformation = recoveredGrid;
  if (recoveredGrid) {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = colorsInformation[index];
    }
  }
};

document.querySelector('#grid-size').addEventListener('input', (event) => {
  gridValue = Number(event.target.value);
  localStorage.setItem('gridSize', gridValue);
});

document.querySelector('#resize-button').addEventListener('click', () => {
  if (gridValue === '' || gridValue < 5 || gridValue > 20) {
    alert(errorMessage);
    gridValue = Math.max(5, Math.min(20, gridValue));
  }
  newBoard(gridValue);
  if (gridValue > 18) {
    pixels.style.width = '20px';
    pixels.style.height = '20px';
  }
});

document.querySelector('#reset-grid').addEventListener('click', () => {
  gridValue = 5;
  localStorage.setItem('gridSize', gridValue);
  localStorage.removeItem('pixelBoard');
  newBoard(gridValue);
  document.querySelector('#grid-size').value = 5;
});

const initializePage = () => {
  newButton();
  let gridSize = Number(localStorage.getItem('gridSize'));
  if (!gridSize) {
    gridSize = 5;
  }
  newBoard(gridSize);
  savedColors();
  recoverGrid();
  changeColors();
  resetBtn();
};

window.onload = initializePage;

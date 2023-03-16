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
    const localSavedColors = JSON.parse(localStorage.getItem('colorPalette'));
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
    recoverGrid()
    changeColors();
    resetBtn();
};

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
        pixels.style.border = '1px solid black'
        pixels.style.width = '40px';
        pixels.style.height = '40px';
        pixels.style.backgroundColor = 'white';
        firstPixel.style.marginLeft = '120px';
        firstPixel.style.marginTop = '60px';
    }
};

// firstColors e colors -> palheta de cores
// pixels -> os grids

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
        });
    }

    for (let index = 0; index < pixels.length; index += 1) {
        pixels[index].addEventListener('click', (event) => {
            const colorsSelect = document.querySelector('.selected');
            if (colorsSelect) {
                const colorSelected = window.getComputedStyle(colorsSelect).getPropertyValue('background-color'); // Obrigado StackOverFlow e documentação do MDN (todas aquelas horas lendo para entender valeram a pena!).
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
    resetButton.addEventListener('click', resetBoard);
    resetButton.style.marginLeft = '26%';
    resetButton.style.display = 'inline-flex';
    resetButton.style.marginTop = '0';

    function resetBoard() {
        for (let index = 0; index < pixels.length; index += 1) {
            pixels[index].style.backgroundColor = 'rgb(255, 255, 255)';
        }
    }
};

// Os comentários a seguir são para o eu do futuro quando se ele estiver com dúvidas com localStorage.
   // Cria um objeto para guardar a cor atual e a em qual pixel ela está

const saveActualGrid = () => {
    const colorsInformation = []
    for (let index = 0; index < pixels.length; index += 1) { // guarda na constante color os estilos CSS atribuidos a pixels[index] (feito pelo getComputedStyle) e 'filtra' qual propriedade é pedida (getPropertyValue).
        const colorInfo = window.getComputedStyle(pixels[index]).getPropertyValue('background-color'); // Nota: como é uma propriedade CSS, a escrita correta é 'background-color' e não backgroundColor.
        colorsInformation[index] = colorInfo; // Popula o objeto com as informações de cor e do index (pixel atual).  
    }
    localStorage.setItem('pixelBoard', JSON.stringify(colorsInformation));
     // transforma o objeto em string para ser possivel salvar.
};

const recoverGrid = () => {
    let colorsInformation = []
    const recoveredGrid = JSON.parse(localStorage.getItem('pixelBoard'));
    colorsInformation = recoveredGrid;
   if (recoveredGrid) {
      for (let index = 0 ; index < pixels.length; index += 1) {
          pixels[index].style.backgroundColor = colorsInformation[index];
      }
    }
  };
  
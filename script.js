document.addEventListener('DOMContentLoaded', function () {
  showBoardSizePrompt(); 
});

function showBoardSizePrompt() {
  const rows = parseInt(prompt('Zadej počet řádků:', '8'));
  const cols = parseInt(prompt('Zadej počet sloupců:', '8'));

  if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1) {
    alert('Neplatný vstup. Zadej platné číslo větší než 0.');
    showBoardSizePrompt(); 
    return;
  }

  generateChessboard(rows, cols);
  addConfirmationButtons();
}

function generateChessboard(rows, cols) {
  const chessboard = document.getElementById('chessboard');
  chessboard.innerHTML = ''; 

  for (let row = 0; row < rows; row++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    for (let col = 0; col < cols; col++) {
      const square = createSquare(row, col);
      rowElement.appendChild(square);
    }

    chessboard.appendChild(rowElement);
  }

  const boardInfo = document.getElementById('boardInfo');
  boardInfo.textContent = `Šachovnice s ${rows} řádky a ${cols} sloupci vygenerována.`;
}

function createSquare(row, col) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.id = 'cell_' + row + '_' + col;
  
  if ((row + col) % 2 === 0) {
    square.classList.add('white');
  } else {
    square.classList.add('black');
  }
  
  square.textContent = ''; 

  square.addEventListener('click', function () {
    editCellContent(square);
  });

  return square;
}

function editCellContent(cell) {
  const originalContent = cell.textContent;
  let content = prompt('Uprav obsah buňky:', cell.textContent);

  while (!isValidContent(content)) {
    content = prompt('Neplatný vstup. Zadej platný obsah:', cell.textContent);
  }

  if (content !== null) {
    cell.textContent = content;
    cell.setAttribute('data-original-content', originalContent);
    addConfirmationButtons(); 
  }
}

function addConfirmationButtons() {
  hideConfirmationButtons();

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Potvrdit změny';
  confirmButton.addEventListener('click', function () {
    confirmChanges();
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Zrušit změny';
  cancelButton.addEventListener('click', function () {
    cancelChanges();
  });

  const addRowButton = document.createElement('button');
  addRowButton.textContent = 'Přidat řádek';
  addRowButton.addEventListener('click', function () {
    addRow();
  });

  const deleteRowButton = document.createElement('button');
  deleteRowButton.textContent = 'Odebrat řádek';
  deleteRowButton.addEventListener('click', function () {
    deleteRow();
  });

  const addColButton = document.createElement('button');
  addColButton.textContent = 'Přidat sloupec';
  addColButton.addEventListener('click', function () {
    addColumn();
  });

  const deleteColButton = document.createElement('button');
  deleteColButton.textContent = 'Odebrat sloupec';
  deleteColButton.addEventListener('click', function () {
    deleteColumn();
  });

  const calculateSumButton = document.createElement('button');
  calculateSumButton.textContent = 'Spočítat součet';
  calculateSumButton.addEventListener('click', function () {
    calculateSum();
  });

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');
  buttonsContainer.appendChild(confirmButton);
  buttonsContainer.appendChild(cancelButton);
  buttonsContainer.appendChild(addRowButton);
  buttonsContainer.appendChild(deleteRowButton);
  buttonsContainer.appendChild(addColButton);
  buttonsContainer.appendChild(deleteColButton);
  buttonsContainer.appendChild(calculateSumButton);

  document.body.appendChild(buttonsContainer);
}

function hideConfirmationButtons() {
  const buttonsContainer = document.querySelector('.buttons-container');
  if (buttonsContainer) {
    buttonsContainer.remove();
  }
}

function confirmChanges() {
  alert('Změny potvrzeny!');
  hideConfirmationButtons();
}

function cancelChanges() {
  const cells = document.querySelectorAll('.square');
  cells.forEach(cell => {
    const originalContent = cell.innerHTML;
    cell.innerHTML = '';
    cell.setAttribute('data-original-content', originalContent);
  });
  alert('Změny zrušeny!');
  hideConfirmationButtons();
}

function isValidContent(content) {
  return content !== null && content.trim() !== '';
}

function calculateSum() {
  const cells = document.querySelectorAll('.square');
  let sum = 0;

  cells.forEach(cell => {
    const content = parseInt(cell.textContent);
    if (!isNaN(content)) {
      sum += content;
    }
  });

  alert(`Celková hodnota buňky: ${sum}`);
}

function addRow() {
  const chessboard = document.getElementById('chessboard');
  const rows = chessboard.children.length;
  const cols = chessboard.children[0].children.length;

  const rowElement = document.createElement('div');
  rowElement.classList.add('row');

  for (let col = 0; col < cols; col++) {
    const square = createSquare(rows, col);
    rowElement.appendChild(square);
  }

  chessboard.appendChild(rowElement);

  const boardInfo = document.getElementById('boardInfo');
  boardInfo.textContent = `Šachovnice s ${rows + 1} řádky a ${cols} sloupci vygenerována.`;
}

function deleteRow() {
  const chessboard = document.getElementById('chessboard');
  const rows = chessboard.children.length;
  const cols = chessboard.children[0].children.length;

  if (rows > 1) {
    chessboard.lastChild.remove();

    const boardInfo = document.getElementById('boardInfo');
    boardInfo.textContent = `Šachovnice s ${rows - 1} řádky a ${cols} sloupci vygenerována.`;
  } else {
    alert('Nelze odstranit poslední řádek.');
  }
}

function addColumn() {
  const chessboard = document.getElementById('chessboard');
  const rows = chessboard.children.length;
  const cols = chessboard.children[0].children.length;

  for (let row = 0; row < rows; row++) {
    const square = createSquare(row, cols);
    chessboard.children[row].appendChild(square);
  }

  const boardInfo = document.getElementById('boardInfo');
  boardInfo.textContent = `Šachovnice s ${rows} řádky a ${cols + 1} sloupci vygenerována.`;
}

function deleteColumn() {
  const chessboard = document.getElementById('chessboard');
  const rows = chessboard.children.length;
  const cols = chessboard.children[0].children.length;

  if (cols > 1) {
    for (let row = 0; row < rows; row++) {
      chessboard.children[row].lastChild.remove();
    }

    const boardInfo = document.getElementById('boardInfo');
    boardInfo.textContent = `Šachovnice s ${rows} řádky a ${cols - 1} sloupci vygenerována.`;
  } else {
    alert('Nelze odstranit poslední sloupec.');
  }
}

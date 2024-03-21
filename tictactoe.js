//creates a tic-tac-toe table by calling on id's in HTML
function createTable() {
    const container = document.querySelector("#game-container");
    let ticTable = document.createElement("table");
    ticTable.setAttribute("id", "game-table");
    ticTable.setAttribute("class", "table table-striped");
    let tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "table-body");
    ticTable.appendChild(tableBody);
    container.appendChild(ticTable);
  }
  
  //places "-" in each cell of table as a placeholder until players input
  function createTableRow() {
    let counter = 0;
    const tableBody = document.querySelector("#table-body");
    for (let i = 0; i < 3; i++) {
      const newRow = document.createElement("tr");
      for (let j = 0; j < 3; j++) {
        const newCell = document.createElement("td");
        newCell.setAttribute("data-value", `${counter++}`);
        newCell.innerText = "-";
        newRow.appendChild(newCell);
      }
      tableBody.appendChild(newRow);
    }
  }
  //runs through each column to check for 3 in a row
  function columnWin() {
    const rows = document.querySelectorAll("tr");
    const table = [rows[0].children, rows[1].children, rows[2].children];
  
    for (let i = 0; i < 3; i++) {
      if (
        table[0][i].innerText === table[1][i].innerText &&
        table[1][i].innerText === table[2][i].innerText &&
        table[0][i].innerText !== "-"
      ) {
        return table[0][i].innerText;
      }
    }
    return false;
  }
  //runs through each row to check for 3 in a row
  function rowWin() {
    const rows = document.querySelectorAll("tr");
    const table = [rows[0].children, rows[1].children, rows[2].children];
    for (let i = 0; i < 3; i++) {
      if (
        table[i][0].innerText === table[i][1].innerText &&
        table[i][1].innerText === table[i][2].innerText &&
        table[i][0].innerText !== "-"
      ) {
        return table[i][0].innerText;
      }
    }
    return false;
  }
  //checks diagonal paths for 3 in a row
  function diagonalWin() {
    const rows = document.querySelectorAll("tr");
    const table = [rows[0].children, rows[1].children, rows[2].children];
  
    if (
      table[0][0].innerText === table[1][1].innerText &&
      table[1][1].innerText === table[2][2].innerText &&
      table[0][0].innerText !== "-"
    ) {
      return table[1][1].innerText;
    } else if (
      table[0][2].innerText === table[1][1].innerText &&
      table[1][1].innerText === table[2][0].innerText &&
      table[0][2].innerText !== "-"
    ) {
      return table[1][1].innerText;
    }
    return false;
  }
  
  //calls all three check functions to return a true or false value
  function checkForWin() {
    if (
      rowWin() !== false ||
      columnWin() !== false ||
      diagonalWin() !== false
    ) {
      return true;
    }
    return false;
  }
  
  //gets the string value returned from winning check function
  function getWinner() {
    if (columnWin() !== false) {
      return columnWin();
    } else if (rowWin() !== false) {
      return rowWin();
    } else if (diagonalWin() !== false) {
      return diagonalWin();
    }
  }
  
  //determines the players turn based on the turn counter in the outer function
  function getPlayerTurn(turnCounter) {
    if (turnCounter % 2 === 1) {
      return "X";
    } else {
      return "O";
    }
  }
  
  //uses functions to indicate turns, winners, or draws by changing banner text
  function showPlayerTurn(turnCounter) {
    const turnContainer = document.querySelector("#banner-container");
    if (turnContainer.hasChildNodes()) {
      turnContainer.removeChild(turnContainer.firstChild);
    }
    const bannerText = document.createElement("p");
    bannerText.innerText = `${getPlayerTurn(turnCounter)}'s turn`;
    turnContainer.appendChild(bannerText);
  }
  
  function showWinBanner() {
    const turnContainer = document.querySelector("#banner-container");
    if (turnContainer.hasChildNodes()) {
      turnContainer.removeChild(turnContainer.firstChild);
    }
    const bannerText = document.createElement("p");
    bannerText.innerText = `${getWinner()} Won the Round!`;
    turnContainer.appendChild(bannerText);
  }
  
  function showDrawBanner() {
    const turnContainer = document.querySelector("#banner-container");
    if (turnContainer.hasChildNodes()) {
      turnContainer.removeChild(turnContainer.firstChild);
    }
    const bannerText = document.createElement("p");
    bannerText.innerText = "Draw!";
    turnContainer.appendChild(bannerText);
  }
  
  //wipes board clean back to "-" and resets turn counter for new game
  function resetGame() {
    const table = document.querySelector("#game-table");
    const cells = table.querySelectorAll("td");
  
    for (const cell of cells) {
      cell.innerText = "-";
    }
  }
  
  //creates event listener for the table and reset button as well as starts the game
  function startGame() {
    const ticTable = document.querySelector("#game-table");
    let turnCounter = 1;
  
    const resetButton = document.querySelector("#reset-button");
    resetButton.addEventListener("click", () => {
      turnCounter = 1;
      resetGame();
      showPlayerTurn(turnCounter);
    });
  
    ticTable.addEventListener("click", (event) => {
      //ensures game is not ended if targeted element is still blank ("TD")
      if (
        event.target.nodeName === "TD" &&
        event.target.innerText === "-" &&
        checkForWin() !== true
      ) {
        //if the counter is even then "X", if it is odd then "O"
        if (turnCounter % 2 === 1) {
          event.target.innerText = "X";
          turnCounter++;
          showPlayerTurn(turnCounter);
        } else {
          event.target.innerText = "O";
          turnCounter++;
          showPlayerTurn(turnCounter);
        }
      }
      if (checkForWin() === true) {
        showWinBanner();
      } else if (!checkForWin() && turnCounter > 9) {
        showDrawBanner();
      }
    });
  }
  
  //calling functions
  createTable();
  createTableRow();
  showPlayerTurn(1);
  startGame();
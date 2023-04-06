document.addEventListener("DOMContentLoaded", function() {
  const cells = document.querySelectorAll(".cell");
let currentPlayer = "red";

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const currentCell = e.target;
    const currentRow = currentCell.parentElement;
    const currentRowIndex = Array.from(currentRow.parentElement.children).indexOf(currentRow);
    const currentCellIndex = Array.from(currentRow.children).indexOf(currentCell);

    let targetCell;

    for (let i = 5; i >= 0; i--) {
      const row = document.querySelectorAll(".row")[i];
      targetCell = row.children[currentCellIndex];
      if (targetCell.classList.contains("empty")) {
        break;
      }
    }

    if (targetCell.classList.contains("empty")) {
      targetCell.classList.remove("empty");
      targetCell.classList.add(currentPlayer);
      checkWin();
      if(currentPlayer === "red"){
        currentPlayer = "yellow";
      }else{
        currentPlayer = "red";
      }
    }
  });
});

function checkWin() {
  const rows = document.querySelectorAll(".row");
  const cols = document.querySelectorAll(".cell");
  const diagonals = [
    [cells[21], cells[15], cells[9], cells[3]],
    [cells[22], cells[16], cells[10], cells[4]],
    [cells[23], cells[17], cells[11], cells[5]],
    [cells[24], cells[18], cells[12], cells[6]],
    [cells[20], cells[16], cells[12], cells[8]],
    [cells[19], cells[15], cells[11], cells[7]],
    [cells[3], cells[9], cells[15], cells[21]],
    [cells[4], cells[10], cells[16], cells[22]],
    [cells[5], cells[11], cells[17], cells[23]],
    [cells[6], cells[12], cells[18], cells[24]],
    [cells[8], cells[12], cells[16], cells[20]],
    [cells[7], cells[11], cells[15], cells[19]]
  ];

  // Check rows
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        rows[i].children[j].classList.contains(currentPlayer) &&
        rows[i].children[j + 1].classList.contains(currentPlayer) &&
        rows[i].children[j + 2].classList.contains(currentPlayer) &&
        rows[i].children[j + 3].classList.contains(currentPlayer)
      ) {
        alert(`${currentPlayer} wins!`);
        resetBoard();
        return;
      }
    }
  }

  // Check columns
  for (let i = 0; i < cols.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        cols[i].classList.contains(currentPlayer) &&
        cols[i + 7].classList.contains(currentPlayer) &&
        cols[i + 14].classList.contains(currentPlayer) &&
        cols[i + 21].classList.contains(currentPlayer)
      ) {
        alert(`${currentPlayer} wins!`);
        resetBoard();
        return;
      }
    }
  }

  // Check diagonals
  for (let i = 0; i < diagonals.length; i++) {
    if (
      diagonals[i][0].classList.contains(currentPlayer) &&
      diagonals[i][1].classList.contains(currentPlayer) &&
      diagonals[i][2].classList.contains(currentPlayer) &&
      diagonals[i][3].classList.contains(currentPlayer)
    ) {
      alert(`${currentPlayer} wins!`);
      resetBoard();
      return;
    }
  }
  let fullCols = 0;
  for (let i = 0; i < cols.length; i++) {
    if (!cols[i].classList.contains("empty")) {
      fullCols++;
    }
  }

  if (fullCols === cols.length) {
    alert("It's a tie!");
    resetBoard();
  }
}

function resetBoard() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("red", "yellow");
    cells[i].classList.add("empty");
  }
  currentPlayer = "red";
}

resetBtn.addEventListener("click", () => {
  resetBoard();
});
})

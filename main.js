import "./style.css";

const container = document.querySelector(".container");
const winner = document.getElementById("winner");
const gameoverText = document.querySelector(".gameover");
let squares = [];
let nextmove = "X";
const playagain = document.querySelector(".again");
const lines = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
  [1, 4, 7],
  [2, 5, 8],
];

//functions

function gameOver(message) {
  winner.innerHTML = message;
  gameoverText.style.display = "block";
}

function isTie() {
  let shouldReturn = true;
  squares.forEach((square) => {
    if (square.state === "") shouldReturn = false;
  });
  return shouldReturn;
}

function gameWon() {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a].state !== "" &&
      squares[a].state === squares[b].state &&
      squares[a].state === squares[c].state
    ) {
      return true;
    }
  }
  return false;
}
function init() {
  gameoverText.style.display = "none";
  container.innerHTML = "";
  squares.length = 0;
  nextmove = "X";

  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("square", "notclicked");
    const square = new ClassSquare(div, i);
    div.onclick = () => square.clicked();
    container.appendChild(div);
    div.appendChild(document.createElement("p"));
    squares.push(square);
  }
}
class ClassSquare {
  constructor(element, index) {
    this.element = element;
    this.index = index;
    this.state = "";
  }

  clicked() {
    this.state = nextmove;
    this.element.classList.remove("notclicked");
    this.element.onclick = () => false;
    this.element.querySelector("p").innerHTML = this.state;
    if (gameWon()) {
      squares.forEach((square) => {
        square.element.classList.remove("notclicked");
        square.element.onclick = null;
      });
      return gameOver("The winner is player: " + this.state);
    }
    if (isTie()) return gameOver("The game is tied");

    nextmove = nextmove === "X" ? "O" : "X";
  }
}

playagain.addEventListener("click", init);
init();

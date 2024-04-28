
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");


let isPlayerOTurn = true; 
let movesCount = 0; 


const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  isPlayerOTurn = true;
  movesCount = 0;
  enableBoxes();
  hideMessage();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    
    box.innerText = isPlayerOTurn ? "O" : "X";
    isPlayerOTurn = !isPlayerOTurn; 
    box.disabled = true; 
    movesCount++; 

  
    let isWinner = checkWinner();
    
    if (movesCount === 9 && !isWinner) {
      announceDraw();
    }
  });
});


const announceDraw = () => {
  showMessage(`Game was a Draw.`);
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};


const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};


const announceWinner = (winner) => {
  showMessage(`Congratulations, Winner is ${winner}`);
  disableBoxes();
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [pos1, pos2, pos3] = pattern;
    let pos1Val = boxes[pos1].innerText;
    let pos2Val = boxes[pos2].innerText;
    let pos3Val = boxes[pos3].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      announceWinner(pos1Val);
      return true;
    }
  }
};


const showMessage = (message) => {
  msg.innerText = message;
  msgContainer.classList.remove("hide");
};

const hideMessage = () => {
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);


resetBtn.addEventListener("click", resetGame);

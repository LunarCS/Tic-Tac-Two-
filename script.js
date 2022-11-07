//Constants
const cells = document.querySelectorAll('.cell');
const turn = document.querySelector('.turn')
const restartBtn = document.querySelector('.restart');
const cellsArr = [];

//Variables
let player1 = [];  //Player list to store their moves
let player2 = [];
let score = {
    player1: 0,
    player2: 0
}
let flag = true;
let tempArray = Array.from(cells);
let chosenCell = null;
let freeCells;
let winner;

while(tempArray.length) cellsArr.push(tempArray.splice(0,3));   //Convert cells elements into a matrix
function main(){
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            cellsArr[i][j].addEventListener('click', () => {
                if (flag){
                    addCellsPlayer([i,j], player1);
                }
                else{
                    addCellsPlayer([i,j], player2);
                }
            })
        }
    }
}

function addCellsPlayer(indices, player){
    if (player != winner){
        let cell = cellsArr[indices[0]][indices[1]]
        let isWinner = checkWinner(player)
        if (player.length < 3 && !isWinner){  //Only 3 turns each
            if (player == player1){
                cell.innerHTML = "x";
                flag = false;
                turn.innerHTML = "O";
                
            }
            else{
                cell.innerHTML = "o";
                flag = true;
                turn.innerHTML = "X";
            }
            player.push(indices);
        }
        else if (player.length >= 3 && !isWinner){
            if (player == player1){
                grid(indices, player);
            }
            else{
                grid(indices, player);
            }
        }
    }
    if (winner == null){
        if (checkWinner(player)){
            winner = player;
        }
    }
}

function grid(indices, player){
    if (!checkWinner(player)){
        let cell = cellsArr[indices[0]][indices[1]]
        if (cell.innerHTML == "o" && flag){
            return;
        }
        else if (cell.innerHTML == "x" && !flag){
            return;
        }

        if (cell.style.background == "yellow"){    //if this cell is chosen
            chosenCell = null;
            cell.style.background = "white";
            resetValidMoves(freeCells);
        }
        else if (cell.style.background == "green"){    //if this is a free cell
            swapCell(chosenCell, cell);
            checkTurn(player);
            resetValidMoves(freeCells);
        }
        else if (cell.innerHTML != ""){       // if first chosen cell
            if (chosenCell == null){
                chosenCellFunction(cell,player);
                validMoves(indices);    
            }
            else{                             // If not first ever chosen cell
                resetValidMoves(freeCells);
                chosenCell.style.background = "white";
                chosenCellFunction(cell,player);
                validMoves(indices);
            }    
        }
    }
}

function checkTurn(player){
    if (player == player1){
        flag = false;
        turn.innerHTML = "O";
    }
    else{
        flag = true;
        turn.innerHTML = "X";
    }
    return flag;
}

function chosenCellFunction(cell,indices){
    chosenCell = chooseCell(cell);
    freeCells = validMoves(indices);
}

function validMoves(indices){
    let iIndices = [];
    let jIndices = [];
    maxI = 2;
    minI = 0;
    freeCells = [];
    for (let i = indices[0] - 1; i <= indices[0] + 1; i++){
        if (i <= maxI && i >= minI){
            for (let j = indices[1] - 1; j <= indices[1] + 1; j++){
                if (j <= maxI && j >= minI){
                    if (cellsArr[i][j].innerHTML == ""){
                        cellsArr[i][j].style.background = "green";                      //box blur algorithm to check for surrounding cells if they contain a valid move
                        freeCells.push(cellsArr[i][j]);
                    }
                }
            }
        }
    }
    return freeCells;
}

function resetValidMoves(freeCells){
    for (var cell of freeCells){
        cell.style.background = "white";
    }
}

function chooseCell(cell){
    cell.style.background = "yellow";
    return cell;
}
function swapCell(chosenCell, cellTo){
    cellTo.innerHTML = chosenCell.innerHTML;
    chosenCell.innerHTML = "";
    chosenCell.style.background = "white";
}

function resetBoard(){
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            cellsArr[i][j].innerHTML = "";
        }
    }
    player1 = null; // Todo fix it 
    player2 = null;
}

function checkWinner(player){
    let countX = 0;
    let countO = 0;
    let playerStr;
    if (player == player1){
        playerStr = "Player 1";
    }
    else{
        playerStr = "Player 2";
    }
    for (let i = 0; i < 3; i++){        // Sorry for this monstrosity but it works 
        if (cellsArr[i][0].innerHTML == cellsArr[i][1].innerHTML && cellsArr[i][1].innerHTML == cellsArr[i][2].innerHTML && cellsArr[i][0].innerHTML != ""){
            turn.innerHTML = 'Winner is ' + playerStr;
            return true;

        }
        else if (cellsArr[0][i].innerHTML == cellsArr[1][i].innerHTML && cellsArr[1][i].innerHTML == cellsArr[2][i].innerHTML && cellsArr[0][i].innerHTML != ""){
            turn.innerHTML = 'Winner is ' + playerStr;
            return true;
        }
    }
    if (cellsArr[0][0].innerHTML == cellsArr[1][1].innerHTML && cellsArr[1][1].innerHTML == cellsArr[2][2].innerHTML && cellsArr[0][0].innerHTML != ""){
        turn.innerHTML = 'Winner is ' + playerStr;
        return true;
    }
    else if(cellsArr[0][2].innerHTML == cellsArr[1][1].innerHTML && cellsArr[1][1].innerHTML == cellsArr[2][0].innerHTML && cellsArr[0][2].innerHTML != ""){
        turn.innerHTML = 'Winner is ' + playerStr;
        return true;
    }   
    return false;
}

main()

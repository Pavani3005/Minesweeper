var board=[];
var rows=10;
var columns=10;
var minesCount=20;
var minesLocation=[];
var tilesClicked=0;
var flagEnabled=false;
var gameOver=false;

window.onload= function(){
    startGame();
}



function startGame(){

    document.getElementById("flag-button").addEventListener("click",setFlag);
    setMines();
    for (let r = 0; r < rows; r++) {
        let row=[];
        for(let c=0;c<columns;c++){
            let tile=document.createElement("div");
            tile.id=String(r)+"-"+String(c);
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile)
        }
        board.push(row);
    }
    console.log(board)
}

function clickTile(){
    if(gameOver || this.classList.contains("tile-clicked")){
        return;
    }
    let tile=this;
    if (flagEnabled){
        if (tile.innerText==""){
            tile.innerText="🚩";
        }
        else if(tile.innerText="🚩"){
            tile.innerText=""
        }
        return;
    }

    if(minesLocation.includes(tile.id)){
        gameOver=true;
        document.getElementById("mines-count").innerText="LOSER!!";
        revealMines();
        return;
    }

    let coords= tile.id.split("-");
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);
    checkMine(r,c);
}

function setFlag(){
    if (flagEnabled){
        flagEnabled=false;
        document.getElementById("flag-button").style.backgroundColor="lightgray";

    }
    else {
        flagEnabled=true;
        document.getElementById("flag-button").style.backgroundColor="darkgrey";
    }
}


function revealMines(){
    for (let r = 0; r < rows; r++) {
       for(let c=0;c<columns;c++){
        let tile=board[r][c];
        if(minesLocation.includes(tile.id)){
            tile.innerText="💣";
            tile.style.backgroundColor="red";
        }
       } 
    }
}

function setMines(){
    let Mines=minesCount;
    while(Mines>0){
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*columns);
        let id=String(r)+"-"+String(c);
        if(!minesLocation.includes(id)){
            minesLocation.push(id);
            Mines-=1;
        }
    }
}

function checkMine(r,c){

    if(r<0|| r>=rows || c<0 || c>=columns){
        return;
    }
    if(board[r][c].classList.contains("tile-clicked")){
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked+=1;
    let minesFound=0;
    minesFound+=checkTile(r-1,c-1);
    minesFound+=checkTile(r-1,c);
    minesFound+=checkTile(r-1,c+1);
    minesFound+=checkTile(r,c-1);
    minesFound+=checkTile(r,c+1);
    minesFound+=checkTile(r+1,c-1);
    minesFound+=checkTile(r+1,c);
    minesFound+=checkTile(r+1,c+1);

    if(minesFound>0){
        board[r][c].innerText=minesFound;   
        board[r][c].classList.add("x"+String(minesFound));
    }

    else{
        checkMine(r-1,c-1);
        checkMine(r-1,c);
        checkMine(r-1,c+1);
        checkMine(r,c-1);
        checkMine(r,c+1);
        checkMine(r+1,c-1);
        checkMine(r+1,c);
        checkMine(r+1,c+1);
    }

    if(tilesClicked==rows*columns-minesCount){
        document.getElementById("mines-count").innerText="Mines Cleared, YOU WON!!";
        gameOver=true;
        return;
    }
}

function checkTile(r,c){
    if(r<0|| r>=rows || c<0 || c>=columns){
        return 0;
    }
    if(minesLocation.includes(String(r)+"-"+String(c))){
        return 1;
    }
    return 0;
}
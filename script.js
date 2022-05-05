// .easy-board {
//     grid-template-columns: repeat(9, 1fr);
//     grid-template-rows: repeat(9, 1fr);
// }

function createBoard(dificulty) {
   
    let dimension;
    let gameBody = document.querySelector('.game-wrapper');
    if(dificulty == 'easy'){
        gameBody.classList.add('game-wrapper-easy')
        dimension = '9'
    } else if (dificulty == 'med') {
        gameBody.classList.add('game-wrapper-med')
        dimension = '17'
    } else {
        gameBody.classList.add('game-wrapper-hard')
        dimension = "23"
    }
    
    document.querySelector('.game-board').style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
    document.querySelector('.game-board').style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;

    for (let i = 0; i < Math.pow(dimension,2); i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell', 'easy-cell', 'closed');
        cell.setAttribute('id', `cell-${i}`);
        document.querySelector('.game-board').appendChild(cell);
    }
}

function spreadBombs(dificulty) {
     
    let bombs;

    if(dificulty == 'easy'){
        bombs = '10'
    } else if (dificulty == 'med') {
        bombs = '40'
    } else {
        bombs = "60"
    }
    
    let cells = document.querySelectorAll('.cell');
    let cellsNumb = cells.length;

    for (let i = 0; i < bombs; i++) {
        let randomCell = cells[Math.floor(Math.random() * cellsNumb)]
        randomCell.setAttribute("data-cellType", 'bomb');
    }
}

function setNumberForCell() {
    
    let bombs = document.querySelectorAll('[data-cellType="bomb"]');

    for (let i = 0; i < bombs.length; i++) {

        bombLoc = bombs[i].getAttribute('id');

        const pat = /[0-9]{1,5}/;

        bombLocNum = parseInt(bombLoc.match(pat)[0]);

        let numberOfCells = document.querySelectorAll('.cell').length;
        let dimension = Math.sqrt(numberOfCells);
        
        let adjCells = [
            document.getElementById(`cell-${bombLocNum-dimension-1}`),
            document.getElementById(`cell-${bombLocNum-dimension}`),  
            document.getElementById(`cell-${bombLocNum-dimension+1}`),    
            document.getElementById(`cell-${bombLocNum-1}`),    
            document.getElementById(`cell-${bombLocNum+1}`),
            document.getElementById(`cell-${bombLocNum+dimension-1}`),
            document.getElementById(`cell-${bombLocNum+dimension}`),
            document.getElementById(`cell-${bombLocNum+dimension+1}`)];

        for (let x = 0; x < adjCells.length; x++) {
            
            if ( adjCells[x] == null || adjCells[x].getAttribute('data-cellType') == 'bomb' ) {
                continue
            }else if ( adjCells[x].getAttribute('data-cellType') ){
                let cellBombNumb = parseInt(adjCells[x].getAttribute('data-cellType'));
                adjCells[x].setAttribute(`data-cellType`, cellBombNumb+1)
            } else {
                adjCells[x].setAttribute(`data-cellType`, '1')
            }
        
        }               
    }
}

function displayCell(e) {

    let cell = e.target;

    if (cell.getAttribute('data-cellType') == 'bomb'){
        displayBomb(cell)
    } else if (cell.getAttribute('data-cellType') == '1') {
        displayNum(cell, '1')
    } else if (cell.getAttribute('data-cellType') == '2') {
        displayNum(cell, '2')
    } else if (cell.getAttribute('data-cellType') == '3') {
        displayNum(cell, '3')
    } else if (cell.getAttribute('data-cellType') == '4') {
        displayNum(cell, '4')
    } else if (cell.getAttribute('data-cellType') == '5') {
        displayNum(cell, '5')
    } else if (cell.getAttribute('data-cellType') == '6') {
        displayNum(cell, '6')
    } else if (cell.getAttribute('data-cellType') == '7') {
        displayNum(cell, '7')
    } else if (cell.getAttribute('data-cellType') == '8') {
        displayNum(cell, '8')
    } else {
        displayEmptyCells(cell)
    }
}

function displayNum(cell, num) {
    cell.classList.remove('closed');
    cell.classList.add('open');
    cell.classList.add(`open-${num}`);
}

function displayBomb(cell) {
    cell.classList.remove('closed');
    cell.classList.add('bomb');
}

function displayEmptyCells(cell) {

    cell.classList.remove('closed')

    cell.classList.add('open')

    
    let numberOfCells = document.querySelectorAll('.cell').length;
    let dimension = Math.sqrt(numberOfCells);

    let cellID = cell.getAttribute('id');

    const pat = /[0-9]{1,4}/;

    const cellNum = parseInt(cellID.match(pat)[0]);
    console.log(cellNum)
    let adjCells = [];

    if (cellNum == 0) {


        adjCells = [   
            document.getElementById(`cell-${cellNum+1}`),        
            document.getElementById(`cell-${cellNum+dimension}`),    
            document.getElementById(`cell-${cellNum+dimension+1}`)] 

    }else if (cellNum == (dimension-1)) {

        adjCells = [   
            document.getElementById(`cell-${cellNum-1}`),        
            document.getElementById(`cell-${cellNum+dimension-1}`),    
            document.getElementById(`cell-${cellNum+dimension}`)] 
    
    }else if (cellNum == (Math.pow(dimension,2))-dimension) {

        adjCells = [   
            document.getElementById(`cell-${cellNum-dimension+1}`),        
            document.getElementById(`cell-${cellNum-dimension}`),    
            document.getElementById(`cell-${cellNum+1}`)]   

    }else if (cellNum == (Math.pow(dimension,2))-1) {

        adjCells = [   
            document.getElementById(`cell-${cellNum-1}`),        
            document.getElementById(`cell-${cellNum-dimension}`),    
            document.getElementById(`cell-${cellNum-dimension+1}`)] 

    }else if(cellNum % dimension  ==  0 ) {

        adjCells = [
                    document.getElementById(`cell-${cellNum-dimension}`),  
                    document.getElementById(`cell-${cellNum-dimension+1}`),    
                    document.getElementById(`cell-${cellNum+1}`),        
                    document.getElementById(`cell-${cellNum+dimension}`),    
                    document.getElementById(`cell-${cellNum+dimension+1}`)] 

    } else if ((cellNum+1) % dimension ==0 ) {

        adjCells = [
                    document.getElementById(`cell-${cellNum-dimension-1}`),
                    document.getElementById(`cell-${cellNum-dimension}`),  
                    document.getElementById(`cell-${cellNum-1}`),    
                    document.getElementById(`cell-${cellNum+dimension-1}`),    
                    document.getElementById(`cell-${cellNum+dimension}`)] 

    } else if (cellNum >= 0 && cellNum < dimension) {
        adjCells = [ 
                    document.getElementById(`cell-${cellNum-1}`),    
                    document.getElementById(`cell-${cellNum+1}`),    
                    document.getElementById(`cell-${cellNum+dimension-1}`),    
                    document.getElementById(`cell-${cellNum+dimension}`),    
                    document.getElementById(`cell-${cellNum+dimension+1}`)];

    } else if (cellNum >= (Math.pow(dimension,2))-dimension  && cellNum < (Math.pow(dimension,2))) {
        adjCells = [
                    document.getElementById(`cell-${cellNum-dimension-1}`),
                    document.getElementById(`cell-${cellNum-dimension}`),  
                    document.getElementById(`cell-${cellNum-dimension+1}`),    
                    document.getElementById(`cell-${cellNum-1}`),    
                    document.getElementById(`cell-${cellNum+1}`)];

    } else {
        adjCells = [
                    document.getElementById(`cell-${cellNum-dimension-1}`),
                    document.getElementById(`cell-${cellNum-dimension}`),  
                    document.getElementById(`cell-${cellNum-dimension+1}`),    
                    document.getElementById(`cell-${cellNum-1}`),    
                    document.getElementById(`cell-${cellNum+1}`),
                    document.getElementById(`cell-${cellNum+dimension-1}`),
                    document.getElementById(`cell-${cellNum+dimension}`),
                    document.getElementById(`cell-${cellNum+dimension+1}`)];
    }
        
    adjCells.forEach(cell => {
        if (cell === null || cell.getAttribute('data-cellType') == 'bomb'){
            return 
        }else if (cell.getAttribute('data-cellType')) {
            displayNum(cell, cell.getAttribute('data-cellType'))
            return;
        }else if (cell.classList.contains('open')){
            return;
        }else {
            displayEmptyCells(cell)   
        }
    })

};

function addFlag(e) {
    e.preventDefault()
    const cell = e.target;
    cell.classList.add('flag');
    cell.removeEventListener('click', (e)=> {displayCell(e)})
    cell.removeEventListener('contextmenu', (e)=>addFlag(e))
    cell.addEventListerner('contextmenu', (e)=>removeFlag(e))
}

function removeFlag(e) {
    e.preventDefault()
    const cell = e.target;
    cell.classList.remove('flag');
    cell.addEventListerner('click', (e)=> {displayCell(e)})
    cell.addEventListerner('contextmenu', (e)=>addFlag(e))
    cell.removeEventListerner('contextmenu', (e)=>removeFlag(e))
}

// Timer Section ----------------------------------------------------------------------------------

const timer = (function (){

    let s = 0;
    
    let m = 0;
    
    const displayTimer = () => {

        const timeDiv = document.querySelector('.timer')

        if (s.toString().length > 1 && m.toString().length == 1){
            timeDiv.textContent = `0${m}:${s}`;
        }else if (s.toString().length == 1 && m.toString().length > 1) {
            timeDiv.textContent = `${m}:0${s}`;
        }else if (s.toString().length == 1 && m.toString().length == 1) {
            timeDiv.textContent = `0${m}:0${s}`;
        } else {
            timeDiv.textContent = `${m}:${s}`;
        }
    }

    const timerLogic = () => {
        if (s < 59) {
            s += 1;
            displayTimer(s, m)
        } else {
            s = 0;
            m += 1;
            displayTimer(s, m)
        }
    }

    const startTimer = setInterval(timerLogic, 1000);

    const stopTimer = () => { clearInterval(startTimer) }
    
    const resetTimer = () =>  {
        s = 0;
        m = 0;
    }

    return {stopTimer, resetTimer};
})()

createBoard('hard')
spreadBombs('hard')
setNumberForCell()
document.querySelectorAll('.closed').forEach(cell => {cell.addEventListener('click', (e)=> {displayCell(e)})})
document.querySelectorAll('.closed').forEach(cell => {cell.addEventListener('contextmenu', (e)=> {addFlag(e)})})

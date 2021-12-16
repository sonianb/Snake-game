document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10;
    let currentIndex = 0; //first div in grid
    let appleIndex = 0 
    let currentSnake = [2,1,0] //the div in the grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1's being the body)
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

//start and restart the game
function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    //randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
}



    //assign functions to keycodes
function control(e) {
    squares[currentIndex].classList.remove('snake')

    if(e.keyCode === 39) {
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
    } else if(e.keyCode === 38) {
        direction = -width //if we press the up arrow, the snake will go back 10 divs, appearing to go up
    } else if(e.keyCode === 37) {
        direction -1 //if we press left, the snake will go left one div
    } else if(e.keyCode === 40) {
        direction = +width //if we press down, the snake will instantly appear ten divs from where you are now 
    }
}

document.addEventListener('keyup', control)

})
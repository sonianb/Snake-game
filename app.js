document.addEventListener('DOMContentLoaded', () => {
    const gridElem = document.querySelector('.grid');
    
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');
    const restartBtn = document.querySelector('.restart');
    const snake = document.querySelector('.snake');

    /**
     * Size of the wall in number of squares
     */
    const width = 20;

    let currentIndex = 0; //first div in grid
    let appleIndex = 0
    let currentSnake = [2, 1, 0] //the div in the grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1's being the body)
    let direction = 1;
    let score = 0;
    let speedIncreaseRate = 0.9;
    let initialSpeed = 0;
    let interval = 0;

    for (let i=0; i <= width * width; i++) {
        gridElem.appendChild(document.createElement('div'));
    }
    const squares = document.querySelectorAll('.grid div');

    //start and restart the game
    function startGame() {
        snake.classList.remove('hide');
        startBtn.classList.add('hide');
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        initialSpeed = 300
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, initialSpeed)
    }

    function loseGame() {
        restartBtn.classList.remove('hide');
        gridElem.innterText = `Your score is ${score}!`

    }

    //function that deal with ALL the ove outcomes of the snake

    //deals with snake hitting border and snake hitting self
    function moveOutcomes() {
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into self
        ) {
            loseGame()
            return clearInterval(interval) //this will clear the interval if any of the above happen
            
        }
        const tail = currentSnake.pop() //removes last ite of the array and shows it
        squares[tail].classList.remove('snake'); //removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        //deals with snake getting apple 
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            initialSpeed = initialSpeed * speedIncreaseRate
            interval = setInterval(moveOutcomes, initialSpeed)
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    //snake will grow every time apple is eaten

//generate new apple once apple is eaten 
function randomApple () {
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}


    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if (e.keyCode === 39) {
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direction = -width //if we press the up arrow, the snake will go back 10 divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = - 1 //if we press left, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width //if we press down, the snake will instantly appear ten divs from where you are now 
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);

});
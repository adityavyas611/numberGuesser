/*
GAME FUNCTION:
- PLAYER MUST GUESS A NUMBER BETWEEN A MIN AND MAX
- PLAYER GETS A CERTAIN AMOUNT OF GUESSES
- NOTIFY PLAYER OF GUESSES REMAINING
- NOTIFY THE PLAYER OF THE CORRECT ANSWER IF LOOSE
- LET PLAYER CHOOSE TO PLAY AGAIN
*/

// GAME VALUES
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI ELEMENTS

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//ASSIGN UI MIN AND MAX

minNum.textContent = min;
maxNum.textContent = max;

//play again event listener

game.addEventListener('mousedown',function(e){
    
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//LISTEN FOR GUESS
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }else{

    //check if won
    if(guess === winningNum){

        gameOver(true,`${winningNum} is correct, YOU WIN!`);

    }else{
        //Wrong number

        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Game Over 
            gameOver(false,`Game Over, YOU LOST. The correct number was ${winningNum}`);

        }else{
            //Game Continues
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');

        }

    }
}
});

function gameOver(won,msg){

    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    
    guessInput.style.borderColor = color;

    message.style.color = color;
    
    setMessage(msg);

    //play again

    guessBtn.value ='Play Again';
    guessBtn.className += 'play-again';
}

function getRandomNum(min,max){
    return Math.floor((Math.random() * (max-min+1)+min));
}

function setMessage(msg,color){
    message.style.color = color;
    message.textContent = msg;
}
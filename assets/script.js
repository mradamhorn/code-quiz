// Create an array of questions +
// Create a start button on HTML +
// Hide start button when clicked + 
// Populate question on HTML +
// Create buttons for multiple choice answers +
// Create multiple choice answers +
// Create event listeners for buttons click +
// When click on any button, move to next question +
// After last question, user presented with alert / game over notification +


// Create timer +
// Keep track of score +
// Find a way to identify if user click on right answer +
// Create form for user to enter initials +
// Store high scores 
// Display high scores
// Try again button

let startButton = document.querySelector('#startBtn');
let questionBox = document.querySelector('#questionBox');
let choiceButton = document.querySelector('#choices');
let timerEl = document.querySelector('#timer');
let scoreList = document.querySelector('#scoreList');

let scoreArray = [];

let questionCount = 0;
let timeLeft = 76;
let score = 0;
let correctAnswer;


// Array of questions, answer choices, and correct answer
let questions = [
    {
        q : 'What is a stock?',
        a : ['A way to trade commodities', 'The thing that Jack climbed', 'A right to buy shares in the future', 'A share of ownership in a company'],
        correct : 'A share of ownership in a company',
    },
    {  
        q : 'What is a dividend?',
        a : ['A person who trades securities', 'An electronic notification of a trade', 'A payment of profits to a stockholder', 'A fee to buy stocks or bonds'],
        correct : 'A payment of profits to a stockholder',
    },
    {
        q : 'Who developed the first index fund?',
        a : ['Warren Buffet', 'John C. Bogle', 'John Pierpont "J.P." Morgan', 'Benjamin Graham'],
        correct : 'John C. Bogle',
    },
    {
        q : 'Which market crisis led to the separation of retail and investment banks?',
        a : ['The Panic of 1907', 'The Great Depression', 'Black Monday in 1987', 'The Financial Crisis in 2008'],
        correct : 'The Panic of 1907',
    },
    {
        q : 'What is a popular metric to value a stock?',
        a : ['The z-score', 'The price-earnings ratio', 'The market capitalization of the company', 'The Du Pont Formula'],
        correct : 'The price-earnings ratio',
    }
];

// Event listener for start button to start the quiz and timer
startButton.addEventListener('click', function(){
    startButton.setAttribute('style', 'display: none;');
    displayQuestion(0);
    timer();
});

// Event listener for question choices, event target to determine if correct answer was selected
choiceButton.addEventListener('click', function(event){
    let element = event.target;
    if(element.matches('button')){
        
        // Adjusts score depending on choice targeted
        if(element.textContent == questions[questionCount].correct){
            score+=10;
            alert('Correct!');
        } else{
            score-=5;
            timeLeft-=10;
        }
    } 

    // Adds to the question count, clears question and choice, and runs function to populate the next question and choice
    console.log(score);
    questionCount++;
    questionBox.innerHTML = '';
    choiceButton.innerHTML = '';
    displayQuestion(questionCount);
});

// Timer function, sets interval to 1 second decrements
function timer() {
    let timerInterval = setInterval(function(){
        timeLeft--;
        timerEl.innerHTML = 'Time remaining:<br>' + timeLeft + ' seconds';

        // Clears the timer from the screen if all the questions have been answered
        if(questionCount === questions.length){
            if(timeLeft > 0){
                clearInterval(timerInterval);
                timerEl.innerHTML = '';
            }
        }

        // Clears the timer from screen if time expires and runs the gameOver function
        if(timeLeft === 0){
            clearInterval(timerInterval);
            timerEl.innerHTML = '';

            gameOver();
        }

    }, 1000);
}

// Question function
function displayQuestion(questionCount){

    // Runs gameOver funtion if all questions have been answered
    if (questionCount === questions.length) {
        return gameOver();
    
    // Creates the question on the screen as part of the questionBox div
    } else {
        let questionEl = document.createElement('h2');
        questionBox.appendChild(questionEl);
        questionEl.textContent = questions[questionCount].q;

        // Brings up the question choices as buttons as part of the choice div
        for(let i = 0; i < questions[questionCount].a.length; i++){
            let buttonEl = document.createElement('button');
            choiceButton.appendChild(buttonEl);
            buttonEl.textContent = questions[questionCount].a[i];   
        }
    }
    
};

function gameOver(){
    // Add time amount to score
    score += timeLeft;

    // Displays a notification after the last question for the user's score
    let scoreSheet = document.createElement('h2');
    questionBox.innerHTML = '';
    choiceButton.innerHTML = '';
    questionBox.appendChild(scoreSheet);
    scoreSheet.textContent = 'Quiz complete! Your score is ' + score + '.';

    // Displays message to input user initials for record
    let enterInitials = document.createElement('h3');
    enterInitials.setAttribute('id', 'enterInitials');
    questionBox.appendChild(enterInitials);
    enterInitials.textContent = 'Enter your initials for recognition for the realm to see!'

    // Text box for entering user initials
    let textBox = document.createElement('input');
    textBox.setAttribute('type', 'text');
    textBox.setAttribute('id', 'initials');
    textBox.textContent = '';
    questionBox.appendChild(textBox);

    // Button to submit initials and score info
    let commitScore = document.createElement('button');
    commitScore.setAttribute('type', 'submit');
    commitScore.setAttribute('id', 'submitScore');
    commitScore.textContent = 'Submit Score';
    questionBox.appendChild(commitScore);

    // Event listener for process to record initials and score
    commitScore.addEventListener('click', function(){

        // Remove elements related to inputing initials for score
        questionBox.removeChild(enterInitials);
        questionBox.removeChild(textBox);
        questionBox.removeChild(commitScore);

        // Diplays Retry Quiz button
        retry();

        // Score List Title
        let scoreListTitle = document.createElement('h2');
        scoreListTitle.setAttribute('id', 'scoreListTitle');
        scoreListTitle.textContent = 'Latest Scores';
        questionBox.appendChild(scoreListTitle);

        // Score list that populates after submitting initials
        let scoreRecords = document.createElement('div');
        scoreRecords.setAttribute('id', 'scoreRecords');
        scoreRecords.textContent = '';
        scoreList.appendChild(scoreRecords);

        let initials = textBox.value;

        let scoreRecord = {
            name : initials,
            score : score
        };

        scoreArray.push(scoreRecord);

        console.log(scoreRecord)

        // Log score into local storage
        localStorage.setItem('scoreList', JSON.stringify(scoreArray));

        // Pull scores from local storage
        let pullScores = JSON.parse(localStorage.getItem('scoreList'));
        console.log(pullScores);

        for(let i = 0; i < pullScores.length; i++){
            let pulled = document.createElement('h3');
            pulled.innerHTML = pullScores[i].name + ' ............ ' + pullScores[i].score;
            document.getElementById('scoreRecords').appendChild(pulled);
            console.log(pullScores[i]);
        }
        
        
        // Retry Button
        function retry(){
            let retryButton = document.createElement('button');
            retryButton.setAttribute('type', 'submit');
            retryButton.setAttribute('id', 'retry');
            retryButton.textContent = 'Retry Quiz';
            questionBox.appendChild(retryButton);

            // Event listener if user wants to replay the quiz
            retryButton.addEventListener('click', function(){

                // Remove retry button and score info
                questionBox.removeChild(retryButton);
                questionBox.removeChild(scoreSheet);
                questionBox.removeChild(scoreListTitle);
                scoreList.removeChild(scoreRecords);
                
                // Reset score counter
                score =0;

                // Reset question count and restart quiz
                questionCount = 0;
                displayQuestion(0);
                
                // Reset countdown and repopulate timer text
                timeLeft = 75;
                timerEl.innerHTML = 'Time remaining: <br>' + timeLeft + ' seconds';

                // Restart timer countdown
                timer();
                

    })
}
    });
};





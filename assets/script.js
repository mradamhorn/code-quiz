// Create an array of questions
// Create a start button on HTML
// Hide start button when clicked  
// Populate question on HTML
// Create buttons for multiple choice answers
// Create multiple choice answers
// Create event listeners for buttons click
// When click on any button, move to next question
// After last question, user presented with alert / game over notification


// Create timer
// Keep track of score
// Find a way to identify if user click on right answer
// Create form for user to enter initials
// Store high scores 

let startButton = document.querySelector('#startBtn');
let questionBox = document.querySelector('#questionBox');
let choiceButton = document.querySelector('#choices');

let questionCount = 0;
let timeLeft = 90;
let score = 0;
let correctAnswer;


// Array of questions with answers
let questions = [
    {
        q : 'What is a stock?',
        a : ['A way to trade commodities', 'The part of a plant that is sold at future prices', 'The market in which a security is bought and sold', 'A share of ownership in a company'],
        correct : 'A share of ownership in a company',
    },
    {  
        q : 'What is a dividend?',
        a : ['A position title of a person working on the stock market floor', 'An electronic signal to notify the execution of a trade', 'A payment of portion of a company\'s profit to a stockholder', 'A fee charged by a brokerage firm to hold a security in your portfolio'],
        correct : 'A payment of portion of a company\'s profit to a stockholder',
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
    }]

startButton.addEventListener('click', function(){
    startButton.setAttribute('style', 'display: none;');
    displayQuestion(0);
});

choiceButton.addEventListener('click', function(){
    questionCount++;
    questionBox.innerHTML = '';
    choiceButton.innerHTML = '';
    displayQuestion(questionCount);
});

function displayQuestion(questionCount){
    if (questionCount === questions.length) {
        return showScore();
    } else {
        let questionEl = document.createElement('h2');
        questionBox.appendChild(questionEl);
        questionEl.textContent = questions[questionCount].q;

        for(let i = 0; i < questions[questionCount].a.length; i++){
            let buttonEl = document.createElement('button');
            choiceButton.appendChild(buttonEl);
            buttonEl.textContent = questions[questionCount].a[i];

            if(buttonEl.innerText === questions[questionCount].correct){
                score+=5;
            }
        }
        //tabScore();
        
    }
    console.log(score);
};

function showScore(){
    let scoreSheet = document.createElement('h2');
    questionBox.appendChild(scoreSheet);
    scoreSheet.textContent = 'Your score is ' + score + '.';
};





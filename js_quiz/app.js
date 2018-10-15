function populate() {
    if (quiz.isEnded()) {
        showScore();
      
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showScoreDuringTheQuiz()
        showProgress();
      
    }
};


function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}
    `
};

function showScoreDuringTheQuiz() {
    var currentScore = document.getElementById("current-score");
    currentScore.innerHTML = `
    Your current score is: ${quiz.score}
    `
}

function showScore() {
    // var gameOverHtml = "<h1>Result</h1>";
    // gameOverHtml += "<h2 id='score'> Your score is:  " + quiz.score + "</h2>";
    // var element = document.getElementById("quiz");
    // element.innerHTML = gameOverHtml;
    
    var gameOverHtml = document.querySelector("#quiz");
    gameOverHtml.innerHTML = `
    <h1>Result</h1>
    <br>
    <h2> Your score is: ${quiz.score}/4</h2>
    <button><a href="index.html">Reset</a></button>
    `
};


var questions = [
    new Question("Ko je najljepsi na svijetu?", ["Dado", "Dario", "Dadico", "Darijon"], "Dario"),
    new Question("Sta cesto radi?", ["Hrce", "Spava", "Ono sto misli da Sandra radi", "Kupa se"], "Ono sto misli da Sandra radi"),
    new Question("Sta voli da jede?", ["Mekiko", "Kupus", "Makarone sa sirom", "Mortadela"], "Makarone sa sirom"),
    new Question("Da li je ovo najbolji kviz na svijetu?", ["JESTE", "Nije :(", "Naravno", "Najbolji na svijetu"], "Najbolji na svijetu")
];


var quiz = new Quiz(questions);

populate();

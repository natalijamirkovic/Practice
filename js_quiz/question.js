//constructor function (class)
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer; //correct answer
}

Question.prototype.correctAnswer = function(choice) {
    return choice === this.answer;
}


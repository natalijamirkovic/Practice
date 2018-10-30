/*********************************
 *********QUIZ CONTROLLER*********
 *********************************/
var quizController = (function () {

    //*****Question Construcor*****/
    function Question(id, questionText, options, correctAnswer) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    var questionLocalStorage = {
        setQuestionCollection: function (newCollection) {
            localStorage.setItem('questionCollection', JSON.stringify(newCollection));
        },
        getQuestionCollection: function () {
            return JSON.parse(localStorage.getItem('questionCollection'))  //array qC objekata
        },
        removeQuestionCollection: function () {
            localStorage.removeItem('questionCollection');
        }
        /*A common use of JSON is to exchange data to/from a web server.When receiving data from a web server, the data is always a string.
        Parse the data with JSON.parse(), and the data becomes a JavaScript object.*/
    };

    if (questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([])
    }  //da pripremimo LS kad otvorimo app da ne bude null, cant read property length of null

    var quizProgress = {
        questionIndex: 0
    };

    function Person(id, firstName, lastName, score) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.score = score;
    }

    var currPersonData = {
        fullName: [],
        score: 0
    };

    var adminFullName = ["John", "Smith"];

    var personLocalStorage = {
        setPersonData: function (newPersonData) {
            localStorage.setItem("personData", JSON.stringify(newPersonData))
        },
        getPersonData: function () {
            return JSON.parse(localStorage.getItem("personData"));
        },
        removePersonData: function () {
            localStorage.removeItem("personData");
        }
    }

    if (personLocalStorage.getPersonData() === null) {
        personLocalStorage.setPersonData([]);
    }


    return {
        getQuizProgress: quizProgress,
        getQuestionLocalStorage: questionLocalStorage,
        addQuestionOnLocalStorage: function (newQuestText, opts) {
            var optionsArr, corrAns, questionId, newQuestion, getStoredQuestions, isChecked;

            if (questionLocalStorage.getQuestionCollection() === null) {
                questionLocalStorage.setQuestionCollection([]) /*ako nema pitanja, napravi prazan niz */
            }

            optionsArr = [];

            // isChecked = false;

            for (var i = 0; i < opts.length; i++) {

                if (opts[i].value !== "") {
                    optionsArr.push(opts[i].value)
                }

                if (opts[i].previousElementSibling.checked && opts[i].value !== "") {
                    corrAns = opts[i].value;
                    isChecked = true;
                }
            }

            if (questionLocalStorage.getQuestionCollection().length > 0) {
                questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
            } else {
                questionId = 0;
            }

            if (newQuestText.value !== "") {
                if (optionsArr.length > 1) {
                    if (isChecked) {
                        newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns)

                        getStoredQuestions = questionLocalStorage.getQuestionCollection();

                        getStoredQuestions.push(newQuestion);

                        questionLocalStorage.setQuestionCollection(getStoredQuestions)

                        newQuestText.value = "";

                        for (x = 0; x < opts.length; x++) {
                            opts[x].value = "";                                //for da nam ostanu prazna polja kad insertujemo odgovore i checkbox unchecked
                            opts[x].previousElementSibling.checked = false;
                        }
                        // console.log(questionLocalStorage.getQuestionCollection());

                        return true;
                    } else {
                        alert('You missed to check the correct value');
                        return false;
                    }
                } else {
                    alert('You must insert at least two options');
                    return false;
                }
            } else {
                alert('Please insert question');
                return false;
            }
        },

        checkAnswer: function (ans) {
            if (questionLocalStorage.getQuestionCollection()[quizProgress.questionIndex].correctAnswer === ans.textContent) {
                currPersonData.score++;
                return true;
            } else {
                return false;
            }
        },

        isFinished: function () {
            return quizProgress.questionIndex + 1 === questionLocalStorage.getQuestionCollection().length;
        },

        addPerson: function () {
            var newPerson, personId;
            if (personLocalStorage.getPersonData().length > 0) {
                personId = personLocalStorage.getPersonData()[personLocalStorage.getPersonData().length - 1].id + 1;
            } else {
                personId = 0;
            }
            newPerson = new Person(personId, currPersonData.fullName[0], currPersonData.fullName[1], currPersonData.score);

            personData = personLocalStorage.getPersonData();
            personData.push(newPerson);
            personLocalStorage.setPersonData(personData);
        },
        getCurrPersonData: currPersonData,
        getAdminFullName: adminFullName,
        getPersonLocalStorage: personLocalStorage,
    };

})();



/*********************************
 *********UI CONTROLLER***********
 *********************************/
var UIController = (function () {

    var domItems = {
        //*******Admin Panel Elements****/
        adminPanelSection: document.querySelector(".admin-panel-container"),
        questInsertBtn: document.getElementById("question-insert-btn"), //insertbtn
        newQuestionText: document.getElementById("new-question-text"), //textarea
        adminOptions: document.querySelectorAll(".admin-option"),
        adminOptionsContainer: document.querySelector(".admin-options-container"), //div koji ima div wrapper i inpute
        insertedQuestsWrapper: document.querySelector(".inserted-questions-wrapper"), //div p span koji ima question text
        questUpdateBtn: document.getElementById("question-update-btn"),
        questDeleteBtn: document.getElementById("question-delete-btn"),
        questsClearBtn: document.getElementById("question-clear-btn"),
        resultsListWrapper: document.querySelector(".results-list-wrapper"),
        clearResultsBtn: document.getElementById("results-clear-btn"),
        //********quiz section elements
        quizSection: document.querySelector(".quiz-container"),
        askedQuestText: document.getElementById("asked-question-text"),
        quizOptionsWrapper: document.querySelector(".quiz-options-wrapper"),
        progressBar: document.querySelector("progress"),
        progressPar: document.getElementById("progress"),
        instAnsContainer: document.querySelector(".instant-answer-container"),
        instAnsText: document.getElementById("instant-answer-text"),
        instAnsDiv: document.getElementById("instant-answer-wrapper"),
        emotionIcon: document.getElementById("emotion"),
        nextQuestBtn: document.getElementById("next-question-btn"),
        //****landing page elements */
        landingPageSection: document.querySelector(".landing-page-container"),
        startQuizBtn: document.getElementById("start-quiz-btn"),
        firstNameInput: document.getElementById("firstname"),
        lastNameInput: document.getElementById("lastname"),
        //**********final result section elements */
        finalScoreText: document.getElementById("final-score-text"),
        finalResultSection: document.querySelector(".final-result-container"),

    };


    return {
        getDomItems: domItems,

        addInputsDynamically: function () {

            var addInput = function () {
                var inputHTML, z;

                z = document.querySelectorAll('.admin-option').length;
                // console.log(z);

                inputHTML = '<div class="admin-options-wrapper"> <input type="radio" class="admin-option-' + z + '" name="answer" value="' + z + '"><input type="text" class="admin-option admin-option-' + z + '" value=""></div>';

                domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML)

                domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener("focus", addInput);

                domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener("focus", addInput);
            }

            domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener("focus", addInput);
        },

        createQuestionList: function (getQuestions) {

            var questHTML, numberingArr;

            numberingArr = [];

            domItems.insertedQuestsWrapper.innerHTML = ""; //prvo brisemo sve sto je u listi, pa kroz for dodajemo sve iz question collection

            for (var i = 0; i < getQuestions.getQuestionCollection().length; i++) {
                numberingArr.push(i + 1);

                questHTML = '<p><span>' + numberingArr[i] + getQuestions.getQuestionCollection()[i].questionText + '</span><button id="question-' + getQuestions.getQuestionCollection()[i].id + ' ">Edit</button></p>';

                domItems.insertedQuestsWrapper.insertAdjacentHTML("afterbegin", questHTML);
            }

        },

        editQuestList: function (event, storageQuestList, addInpsDynFn, updateQuestListFn) {
            var getId, getStorageQuestList, foundItem, placeInArray, optionHTML;

            if ('question-'.indexOf(event.target.id)) { //if user has clicked on el which contains id attribute with "question-" -> true 

                getId = parseInt(event.target.id.split('-')[1]); //"question-0" uzima broj id-a, parseInt da vrati integer, a ne string

                getStorageQuestList = storageQuestList.getQuestionCollection();

                for (var i = 0; i < getStorageQuestList.length; i++) {
                    if (getStorageQuestList[i].id === getId) {
                        foundItem = getStorageQuestList[i];
                        placeInArray = i;
                    }
                }

                domItems.newQuestionText.value = foundItem.questionText;

                domItems.adminOptionsContainer.innerHTML = '';

                optionHTML = ''; //da ne bude undefined

                for (var x = 0; x < foundItem.options.length; x++) {
                    optionHTML += '<div class="admin-options-wrapper"><input type="radio" class="admin-option-' + x + '" name="answer" value="' + x + '"><input type="text" class="admin-option admin-option-' + x + '" value=" ' + foundItem.options[x] + '"></div>'
                }

                domItems.adminOptionsContainer.innerHTML = optionHTML;
                domItems.questUpdateBtn.style.visibility = 'visible';
                domItems.questDeleteBtn.style.visibility = 'visible';
                domItems.questInsertBtn.style.visibility = 'hidden';
                domItems.questsClearBtn.style.pointerEvents = 'none'; //disable clear list btn

                addInpsDynFn();

                var backDefaultView = function () {
                    var updatedOptions;

                    domItems.newQuestionText.value = '';
                    updatedOptions = document.querySelectorAll(".admin-option");

                    for (var i = 0; i < updatedOptions.length; i++) {
                        updatedOptions[i].value = "";
                        updatedOptions[i].previousElementSibling.checked = false;
                    }
                    domItems.questUpdateBtn.style.visibility = 'hidden';
                    domItems.questDeleteBtn.style.visibility = 'hidden';
                    domItems.questInsertBtn.style.visibility = 'visible';
                    domItems.questsClearBtn.style.pointerEvents = '';

                    updateQuestListFn(storageQuestList);
                }
                var updateQuestion = function () {
                    var newOptions, optionEls;
                    newOptions = [];
                    optionEls = document.querySelectorAll(".admin-option");
                    foundItem.questionText = domItems.newQuestionText.value;

                    foundItem.correctAnswer = "";

                    for (var i = 0; i < optionEls.length; i++) {
                        if (optionEls[i].value !== "") {
                            newOptions.push(optionEls[i].value);
                            if (optionEls[i].previousElementSibling.checked) {
                                foundItem.correctAnswer = optionEls[i].value;
                            }
                        }
                    }

                    foundItem.options = newOptions;

                    if (foundItem.questionText !== '') {
                        if (foundItem.options.length > 1) {
                            if (foundItem.correctAnswer !== '') {
                                getStorageQuestList.splice(placeInArray, 1, foundItem);
                                storageQuestList.setQuestionCollection(getStorageQuestList);
                                domItems.newQuestionText.value = "";

                                backDefaultView();

                            } else {
                                alert('You missed to check correct answer, or you checked answer without value');
                            }
                        } else {
                            alert("You must insert at least two options");
                        }
                    } else {
                        alert("Please, insert question");
                    }
                }

                domItems.questUpdateBtn.onclick = updateQuestion;

                var deleteQuestion = function () {

                    getStorageQuestList.splice(placeInArray, 1);// brisemo iz LS,ali ne i sa UI
                    storageQuestList.setQuestionCollection(getStorageQuestList) //vracamo promijenjen array, bez ovog sto smo obrisali
                    backDefaultView();
                }

                domItems.questDeleteBtn.onclick = deleteQuestion;
            }

        },

        clearQuestList: function (storageQuestList) { //access on LS
            if (storageQuestList.getQuestionCollection() !== null) {
                if (storageQuestList.getQuestionCollection().length > 0) { //LENGTH OF QUESTION LIST ARRAY
                    var conf = confirm("Warning! You will lose entire question list");

                    if (conf) {
                        storageQuestList.removeQuestionCollection();
                        domItems.insertedQuestsWrapper.innerHTML = '';
                    }

                }
            }
        },

        displayQuestion: function (storageQuestList, progress) {
            var newOptionHTML, characterArr;
            characterArr = ['A', 'B', 'C', 'D', 'E', 'F'];
            if (storageQuestList.getQuestionCollection().length > 0) {
                domItems.askedQuestText.textContent = storageQuestList.getQuestionCollection()[progress.questionIndex].questionText;
                domItems.quizOptionsWrapper.innerHTML = "";
                for (var i = 0; i < storageQuestList.getQuestionCollection()[progress.questionIndex].options.length; i++) {

                    newOptionHTML = '<div class="choice-' + i + '"><span class="choice-' + i + '">' + characterArr[i] + '</span><p  class="choice-' + i + '">' + storageQuestList.getQuestionCollection()[progress.questionIndex].options[i] + '</p></div>';

                    domItems.quizOptionsWrapper.insertAdjacentHTML('beforeend', newOptionHTML);
                }
            }
        },

        displayProgress: function (storageQuestList, progress) {
            domItems.progressBar.max = storageQuestList.getQuestionCollection().length;
            domItems.progressBar.value = progress.questionIndex + 1;
            domItems.progressPar.textContent = (progress.questionIndex + 1) + '/' + storageQuestList.getQuestionCollection().length;
        },
        newDesign: function (ansResult, selectedAnswer) {
            var twoOptions, index;

            index = 0;

            if (ansResult) {
                index = 1;
            }

            twoOptions = {
                instAnswerText: ['This is a wrong answer', "This is a correct answer"],
                instAnswerClass: ['red', 'green'],
                emotionType: ['images/sad.png', 'images/happy.png'],
                optionSpanBg: ["rgba(200, 0, 0, .7)", "rgba(0, 250, 0, .2"],
            };

            domItems.quizOptionsWrapper.style.cssText = "opacity: 0.6; pointer-events: none;";
            domItems.instAnsContainer.style.opacity = "1";
            domItems.instAnsText.textContent = twoOptions.instAnswerText[index];

            domItems.instAnsDiv.className = twoOptions.instAnswerClass[index];

            domItems.emotionIcon.setAttribute("src", twoOptions.emotionType[index]);

            selectedAnswer.previousElementSibling.style.backgroundColor = twoOptions.optionSpanBg[index];
        },
        resetDesign: function () {
            domItems.quizOptionsWrapper.style.cssText = "";
            domItems.instAnsContainer.style.opacity = "0";
        },

        getFullName: function (currPerson, storageQuestList, admin) {
            if (domItems.firstNameInput.value !== "" && domItems.lastNameInput.value !== "") {
                if (!(domItems.firstNameInput.value === admin[0] && domItems.lastNameInput.value === admin[1])) {
                    if (storageQuestList.getQuestionCollection().length > 0) {
                        currPerson.fullName.push(domItems.firstNameInput.value);
                        currPerson.fullName.push(domItems.lastNameInput.value);
                        domItems.landingPageSection.style.display = "none";
                        domItems.quizSection.style.display = "block";
                        console.log(currPerson);
                    } else {
                        alert("Quiz is not ready, please contact to administrator")
                    }
                } else {
                    domItems.landingPageSection.style.display = "none";
                    domItems.adminPanelSection.style.display = "block";
                }
            } else {
                alert("Please, enter your first name and last name");
            }
        },

        finalResult: function (currPerson) {
            domItems.finalScoreText.textContent = currPerson.fullName[0] + " " + currPerson.fullName[1] + ",Your final score is: " + currPerson.score;

            domItems.quizSection.style.display = "none";
            domItems.finalResultSection.style.display = "block";
        },

        addResultOnPanel: function (userData) {

            var resultHTML;
            domItems.resultsListWrapper.innerHTML = "";
            for (var i = 0; i < userData.getPersonData.length; i++) {
                resultHTML = '<p class="person person-' + i + '">' + userData.getPersonData()[i].firstName + " " + userData.getPersonData()[i].lastName + ' - ' + userData.getPersonData()[i].score + 'points</span><button id="delete-result-btn_' + userData.getPersonData()[i].id + '" class="delete-result-btn">Delete</button></p>';
                console.log(domItems);
                
                domItems.resultsListWrapper.insertAdjacentHTML('afterbegin', resultHTML);
            }

        },

        deleteResult: function (event, userData) {
            var getId, personsArr;
            personsArr = userData.getPersonData();
            if ('delete-result-btn_'.indexOf(event.target.id)) {
                getId = parseInt(event.target.id.split("_"))[1];

                for (var i = 0; i < personsArr.length; i++) {
                    if (personsArr[i].id === getId) {
                        personsArr.splice(i, 1);
                        userData.setPersonData(personsArr);
                    }
                }
            }
        },

        clearResultList: function (userData) {

            var conf;

            if (userData.getPersonData() !== null) {

                if (userData.getPersonData.length > 0) {

                    conf = confirm("Warning! You will lose entire result list");

                    if (conf) {
                        userData.removePersonData();
                        domItems.resultsListWrapper.innerHTML = "";
                    }
                }
            }
        }
    };
})();


/*********************************
 *********CONTROLLER**************
 *********************************/
var controller = (function (quizCtrl, UICtrl) {

    var selectedDomItems = UICtrl.getDomItems;

    UIController.addInputsDynamically();

    UIController.createQuestionList(quizCtrl.getQuestionLocalStorage);

    selectedDomItems.questInsertBtn.addEventListener('click', function () {

        var adminOptions = document.querySelectorAll(".admin-option"); //zbog closure selektujemo ovde jer gore vidi samo dva koja imamo u html, to radimo da bi se sve opcije dodale u pitanje

        var checkBoolean = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);

        if (checkBoolean) {
            UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
        }  // if the question is added successfully then we need to invoke createQuestionList again(zato sto ne dodajemo po jedno pitanje, nego sve brisemo kad je dodatno novo, pa ispisujemo listu sa novim pitanjem)
    });

    selectedDomItems.insertedQuestsWrapper.addEventListener("click", function (e) {
        UICtrl.editQuestList(e, quizController.getQuestionLocalStorage, UICtrl.addInputsDynamically, UICtrl.createQuestionList);
    });

    selectedDomItems.questsClearBtn.addEventListener('click', function () {
        UICtrl.clearQuestList(quizCtrl.getQuestionLocalStorage);
    });

    UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);

    UICtrl.displayProgress(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);

    selectedDomItems.quizOptionsWrapper.addEventListener("click", function (e) {
        var updatedOptionsDiv = selectedDomItems.quizOptionsWrapper.querySelectorAll("div");

        for (var i = 0; i < updatedOptionsDiv.length; i++) {
            if (e.target.className === 'choice-' + i) {
                var answer = document.querySelector('.quiz-options-wrapper div p.' + e.target.className);
                var answerResult = quizCtrl.checkAnswer(answer);
                UICtrl.newDesign(answerResult, answer);

                if(quizCtrl.isFinished()) {
                    selectedDomItems.nextQuestBtn.textContent = 'Finish';
                }
                var nextQuestion = function (questData, progress) {
                    if (quizCtrl.isFinished()) {
                        // finish quiz
                        quizCtrl.addPerson();
                        UICtrl.finalResult(quizCtrl.getCurrPersonData);
                    } else {
                        UICtrl.resetDesign();
                        quizCtrl.getQuizProgress.questionIndex++;
                        UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);
                        UICtrl.displayProgress(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);

                    }
                }
                selectedDomItems.nextQuestBtn.onclick = function () {
                    nextQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress)
                }
            }
        }

    });

    selectedDomItems.startQuizBtn.addEventListener("click", function () {
        UICtrl.getFullName(quizCtrl.getCurrPersonData, quizCtrl.getQuestionLocalStorage, quizCtrl.getAdminFullName);
    });

    selectedDomItems.lastNameInput.addEventListener("focus", function () {
        selectedDomItems.lastNameInput.addEventListener("keypress", function (e) {
            if (e.keyCode === 13) {
                UICtrl.getFullName(quizCtrl.getCurrPersonData, quizCtrl.getQuestionLocalStorage, quizCtrl.getAdminFullName);
            }
        })
    });

    console.log(quizCtrl.getPersonLocalStorage);
    
    UICtrl.addResultOnPanel(quizCtrl.getPersonLocalStorage);

    selectedDomItems.resultsListWrapper.addEventListener("click", function () {

        UICtrl.deleteResult(e, quizCtrl.getPersonLocalStorage)

        UICtrl.addResultOnPanel(quizCtrl.getPersonLocalStorage);
    });

    selectedDomItems.clearResultsBtn.addEventListener("click", function () {
        UICtrl.clearResultList(quizCtrl.getPersonLocalStorage);

    })

})(quizController, UIController);



// function Fox(age) {
//     this.age = age || 100;
//   }
//   Fox.prototype.say = function (num) {
//     console.log(this.age || 20 + Math.floor(Math.PI) * num);
//   }
//   var f = new Fox(10);
//   f.say.call({}, 5);

//   console.log('1');

// setTimeout(function() {
//   console.log('2');
// }, 10);

// setTimeout(function() {
//   console.log('3');
// }, 0);

// console.log('4');





// function Fox(color) {
//     this.color = color;
// }
// Fox.prototype.speak = function() {
//     console.log('I am ' + this.color);
// };
// var myFox = new Fox('blue');
// setTimeout(myFox.speak, 1000);

// const arr = [1, 2, 3, 4];
// const [a, b] = arr;
// console.log(a,b,d);s


// const mapData = new Map();
// console.log(mapData)

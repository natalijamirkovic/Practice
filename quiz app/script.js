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

    return {

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
        }
    };

})();



/*********************************
 *********UI CONTROLLER***********
 *********************************/
var UIController = (function () {

    var domItems = {
        //*******Admin Panel Elements****/
        questInsertBtn: document.getElementById("question-insert-btn"), //insertbtn
        newQuestionText: document.getElementById("new-question-text"), //textarea
        adminOptions: document.querySelectorAll(".admin-option"),
        adminOptionsContainer: document.querySelector(".admin-options-container"), //div koji ima div wrapper i inpute
        insertedQuestsWrapper: document.querySelector(".inserted-questions-wrapper"), //div p span koji ima question text
        questUpdateBtn: document.getElementById("question-update-btn"),
        questDeleteBtn: document.getElementById("question-delete-btn"),
        questsClearBtn: document.getElementById("question-clear-btn"),
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

        editQuestList: function (event, storageQuestList, addInpsDynFn) {
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
        UICtrl.editQuestList(e, quizController.getQuestionLocalStorage, UICtrl.addInputsDynamically);
    });

})(quizController, UIController);







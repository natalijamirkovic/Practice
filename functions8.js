// IIFE = Immediately Invoked Function Expressions

// 1.Write IIFE that replaces the first and the last element of the given array and prints out its elements. 
// 	Input array: [4, 5, 11, 9]
// 	Output array: [ 9, 5, 11, 4]


var replace = (function (array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = array[i];
    }
    var tmp = newArray[0];
    newArray[0] = newArray[newArray.length - 1];
    newArray[newArray.length - 1] = tmp;
    return newArray;
})([4, 5, 11, 9]);

console.log(replace);




// 2.Write IIFE that calculates the surface area of the given rectangle with sides a and b. 
// Input: 4 5
// Output: 20 


var surface = (function (a, b) {
    return a * b;
})(4, 5);

console.log(surface);




// 3.Write IIFE that replaces all appearances of the letters m or M with * and returns the number of replacements. 
// 	Input: prograMming
// 	Output: progra**ing, 2


var replaceM = (function (string) {
    var counter = 0;
    var newString = "";
    for (var i = 0; i < string.length; i++) {
        if (string[i] === "m" || string[i] === "M") {
            newString += "*";
            counter++;
        } else {
            newString += string[i];
        }
    }
    return newString + ", " + counter;
})("programMing");

console.log(replaceM);




// 4.Write a function with parameters name and surname that returns a function that suggests an email in the form name.surname@gmail.com. 
// Input: pera peric
// 	Output: pera.peric@gmail.com


function suggestEmail(name, surname) {
    return function () {
        return name + "." + surname + "@gmail.com";
    }
}

var email = suggestEmail("natalija", "mirkovic");
console.log(email());




// 5.Write a function that returns a function that calculates a decimal value of the given octal number. 
// Input: 034
// Output: 28


function octalToDecimal() {
    return function (octal) {
        var counter = 0;
        var result = 0;
        for (var i = octal.length - 1; i > 0; i--) {
            result += Math.pow(8, counter) * octal[i];
            counter++;
        }
        return result;
    }
}
var decimal = octalToDecimal();
console.log(decimal("034"));




// 6.Write a function that checks if a given string is valid password. The password is valid if it is at least 6 characters long and contains at least one digit. The function should receive two callbacks named successCallback and errorCallback that should be called in case password is correct or invalid. 
// Input: JSGuru 
// Output: Your password is invalid!

// 	Input: JSGuru123
// 	Output: Your password is cool! 


function validatePass(string) {
    if (string.length < 6) {
        return false;
    }
    for (var i = 0; i < string.length; i++) {
        if (typeof parseInt(string[i]) === "number" && !isNaN(string[i])) {
            return true;
        }
    }
    return false;
}

function isValide(string, successHandler, errorHandler) {
    var successCallback = function () {
        return "Your password is cool!"
    };
    var errorCallback = function () {
        return "Your password is invalid!"
    };

    if (validatePass(string)) {
        return successCallback();
    } else {
        return errorCallback();
    }
}

console.log(isValide("AJMENE"));




// 7.Write a function that filters elements of the given array so that they satisfy a condition given by the callback function.
// Input: [2, 8, 11, 4, 9, 3], callback function checks if the number is odd
// Output: [11, 9, 3] 


var isOdd = function (element) {
    if (element % 2 === 0) {
        return false;
    }
    return true;
}

function filterArray(array, callback) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            newArray[newArray.length] = array[i];
        }
    }
    return newArray;
}

console.log(filterArray([2, 8, 11, 4, 9, 3], isOdd));
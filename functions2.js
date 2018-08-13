// 1. Write a function to check whether the `input` is a string or not.
// "My random string" -> true
// 12 -> false


function isString(input) {
    if (typeof input === "string") {
        return true;
    } else {
        return false;
    }
}

console.log(isString(12));




// 2. Write a function to check whether a string is blank or not.

// "My random string" -> false
// " " -> true
// 12 -> false
// false -> false


function blankOrNot(a) {
    if (a === " ") {
        return true;
    } else {
        return false;
    }
}

console.log(blankOrNot(" "));




// 3. Write a function that concatenates a given string n times (default is 1).
// 	"Ha" -> "Ha"
// "Ha", 3 -> "HaHaHa"


function concatenateString(string, numberOfTimes = 1) {
    var newString = "";
    for (var i = 0; i < numberOfTimes; i++) {
        newString += string;
    }
    return newString;
}

console.log(concatenateString("Ha", 3));




// 4. Write a function to count the number of letter occurrences in a string.
//"My random string", "n" -> 2


function letterOccurrences(string, letter) {
    var counter = 0;
    for (var i = 0; i < string.length; i++) {
        if (letter === string[i]) {
            counter++;
        }
    }
    return counter;
}

console.log(letterOccurrences("KrisIznenadjuje", "n"));




// 5. Write a function to find the position of the first occurrence of a character in a string. The result should be in human numeration form. If there are no occurrences of the character, the function should return -1.


function firstOccurence(character, string) {
    for (var i = 0; i < string.length; i++) {
        if (string[i] === character) {
            return i + 1;
        }
    }
    return -1;
}

console.log(firstOccurence("b", "abcd"));




// 6. Write a function to find the position of the last occurrence of a character in a string. The result should be in human numeration form. If there are no occurrences of the character, function should return -1.


function lastOccurence(string, character) {
    for (var i = string.length; i > 0; i--) {
        if (character === string[i]) {
            return i + 1;
        }
    }
    return -1;
}
console.log(lastOccurence("gfdsah", "a"));


//or


function lastOccurence(string, letter) {
    for (var i = 0; i < string.length; i++) {
        var lastPosition;
        if (string[i] === letter) {
            lastPosition = i + 1;
        }
    }
    return lastPosition ? lastPosition : -1;
}

console.log(lastOccurence("stringo", "o"));




// 7. Write a function to convert string into an array. Space in a string should be represented as “null” in new array.
// "My random string" -> ["M", "y", null, "r", "a"]
//"Random" -> ["R", "a", "n", "d", "o", "m"]


function stringToArray(string) {
    newArray = [];
    for (var i = 0; i < string.length; i++) {
        if (string[i] === " ") {
            newArray[i] = "null";
        } else {
            newArray[i] = string[i];
        }
    }
    return newArray;
}

console.log(stringToArray("string to array"));




// 8. Write a function that accepts a number as a parameter and checks if the number is prime or not. Note: A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.


function primeOrNot(number) {
    for (var i = 2; i <= number; i++) {
        if (number % i === 0 && i !== number) {
            return "Number is not prime";
        }
    }
    return "Number is prime";
}

console.log(primeOrNot(15));




// 9.Write a function that replaces spaces in a string with provided separator. If separator is not provided, use “-” (dash) as the default separator.

// "My random string", "_" -> "My_random_string"
// "My random string", "+" -> "My+random+string"
// "My random string" -> "My-random-string"


function replaceSpace(string, separator = "-") {
    newString = "";
    for (var i = 0; i < string.length; i++) {
        if (string[i] === " ") {
            newString += separator;
        } else {
            newString += string[i];
        }
    }
    return newString;
}

console.log(replaceSpace("string to array", "+"));




// 10. Write a function to get the first n characters and add “...” at the end of newly created string.


function getFirst(string, number) {
    var newString = "";
    for (var i = 0; i < number; i++) {
        newString += string[i];
        if (i === number - 1) {
            newString += "..."
        }
    }
    return newString;
}

console.log(getFirst("Some string", 4));




// 11.  Write a function that converts an array of strings into an array of numbers. Filter out all non-numeric values. 
//["1", "21", undefined, "42", "1e+3", Infinity] -> [1, 21, 42, 1000]


function filterArray(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (typeof array[i] === "number" && array[i] !== Infinity && !isNaN(array[i])) {
            newArray += array[i] + " ";
        }
    }
    return newArray;
}

console.log(filterArray([1, 21, undefined, 42, 1e+3, Infinity]));




//12. Write a function to calculate how many years there are left until retirement based on the year of birth. Retirement for men is at age of 65 and for women at age of 60. If someone is already retired, a proper message should be displayed.


function yearsTillRetirement(gender, yearOfBirth) {
    var currentYear = 2018;
    var femaleRetirement = 60;
    var maleRetirement = 65;
    var yearsTillMaleRetirement = yearOfBirth + maleRetirement - currentYear;
    var yearsTillFemaleRetirement = yearOfBirth + femaleRetirement - currentYear;

    if (gender === "male") {
        return (yearsTillMaleRetirement > 0) ? yearsTillMaleRetirement : "Allready retired!";
    } else if (gender === "female") {
        return (yearsTillFemaleRetirement > 0) ? yearsTillFemaleRetirement : "Allready retired!";
    } else {
        return "Input invalid";
    }
}

console.log(yearsTillRetirement("male", 1923));




//13. Write a function to humanize a number (formats a number to a human-readable string) with the correct suffix such as 1st, 2nd, 3rd or 4th.
// 1 -> 1st
// 11 -> 11th

// Hint: num % 100 >= 11 && num % 100 <= 13


function humanizeNumber(number) {
    if (typeof number == "undefined") {
        return;
    }

    if (number % 100 >= 11 && number % 100 <= 13) {
        return number + "th";
    }

    switch (number % 10) {
        case 1:
            return number + "st";
        case 2:
            return number + "nd";
        case 3:
            return number + "rd";
    }
    return number + "th";
}

console.log(humanizeNumber(3));
console.log(humanizeNumber(31));
console.log(humanizeNumber(412));
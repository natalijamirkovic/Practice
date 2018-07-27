// 1. Write a program that calculates the maximum of two given numbers. 


function calculateMax(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

console.log(calculateMax(25, 7));




// 2.Write a program that checks if a given number is odd.


function isNumOdd(num) {
    if (num % 2 === 0) {
        return "Number is eval";
    } else {
        return "Number is odd";
    }
}

console.log(isNumOdd(3));




// 3. Write a program that checks if a given number is a three digit long number.


function isThreeDigitLong(num) {
    if (num > 99 && num < 1000) {
        return "Number is three digit long";
    } else {
        return "Number is not three digit long";
    }
}

console.log(isThreeDigitLong(324324324));




// 4. Write a program that calculates an arithmetic mean of four numbers.


function arithmeticMean(num1, num2, num3, num4) {
    return (num1 + num2 + num3 + num4) / 4
}

console.log(arithmeticMean(4, 5, 6, 2));




// 5. Write a program that draws a horizontal chart representing three given values. For example, if values are 5, 3, and 7, the program should draw:
// * * * * *
// * * *
// * * * * * * *



function createChart() {
    var result = "";
    function createSingleChart(num) {
        var string = "";
        for (var i = 0; i < num; i++) {
            string += "*";
        }
        return string;
    }
    for (var i = 0; i < arguments.length; i++) {
        result += createSingleChart(arguments[i]) + "\n";
    }
    return result;
}

console.log(createChart(6, 3, 7));




// 6. Write a program that draws a square of a given size. For example,  if the size of square is 5 the program should draw: 
// *****
// *    *
// *    *
// *    *
// *****


function createSquare(a, b) {
    var star = "*";
    var space = " ";
    var result = "";

    function createTopAndBottom(a) {
        var string = ""
        for (var k = 0; k < a; k++) {
            string += star;
        }
        return string;
    }

    function createMiddle(a) {
        var string = "";
        for (var j = 0; j < a; j++) {
            if (j === 0 || j === a - 1) {
                string += star;
            } else {
                string += space;
            }
        }
        return string;
    }

    for (var i = 0; i < b; i++) {
        if (i === 0 || i === b -1) {
             result += createTopAndBottom(a) + "\n";
        } else {
             result += createMiddle(a) + "\n";
        }   
    }
    return result;
}

console.log(createSquare(5, 5));




// 7. Write a program that calculates a number of digits of a given number. 


function numOfDigits(num) {
    var string = "" + num;
    return string.length;
}

console.log(numOfDigits(45543));




// 8. Write a program that calculates a number of appearances of a given number in a given array.


function numOfAppearences(number, array) {
    var counter = 0;
    for (i = 0; i < array.length; i++) {
        if (number === array[i]) {
            counter++;
        }
    }
    return counter;
}

console.log(numOfAppearences(3, [454, 3, 3, 43, 56, 67]));




// 9. Write a program that calculates the sum of odd elements of a given array. 


function sumOfOdd(array) {
    var sum = 0;
    for (i = 0; i < array.length; i++) {
        if (array[i] % 2 === 1) {
            sum += array[i];
        }
    }
    return sum;
}

console.log(sumOfOdd([3, 4, 5, 6, 7]));




// 10. Write a program that calculates the number of appearances of a letter a in a given string. Modify the program so it calculates the number of both letters a and A.


function numberOfAppearences(string) {
    counter = 0;
    for (i = 0; i < string.length; i++) {
        if (string[i] == "a" || string[i] == "A") {
            counter++
        }
    }
    return counter;
}

console.log(numberOfAppearences("ahjhsdjAkh"));




// 11. Write a program that concatenates a given string given number of times. For example, if “abc” and 4 are given values, the program prints out abcabcabcabc. 


function concatenateString(string, number) {
    newString = "";
    for (var i = 0; i < number; i++) {
        newString += string;
    }

    return newString;
}
console.log(concatenateString("abc", 4));




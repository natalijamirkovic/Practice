/* 1.Find the min and max element in the following array and switch their places. Print out the modified array in the console.
Input:  [ 3, 500, 12, 149, 53, 414, 1, 19 ]
Output: [ 3, 1, 12, 149, 53, 414, 500, 19 ]
*/


function minAndMax(array) {
    var min = array[0];
    var max = array[0];
    var temp = array[0];
    var minIndex = 0;
    var maxIndex = 0;

    for (var i = 0; i < array.length; i++) {
        if (min > array[i]) {
            min = array[i];
            minIndex = i;
        }
        if (max < array[i]) {
            max = array[i];
            maxIndex = i;
        }
    }
    var temp = array[minIndex];
    array[minIndex] = array[maxIndex];
    array[maxIndex] = temp;

    return array;
}

console.log(minAndMax([3, 500, 12, 149, 53, 414, 1, 19]));




/* 2.Use the following array to make a new one by dividing its values by two and adding 5. If a given element's value is 0, change it to 20.
Input:  [ 3, 500, -10, 149, 53, 414, 1, 19 ]
Output: [ 6.5, 255, 0, 79.5, 31.5, 212, 5.5, 14.5 ]
*/


function arrayMap(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] === 0) {
            newArray[i] = 20;
        } else {
            newArray[i] = array[i] / 2 + 5;
        }
    }
    return newArray;
}

console.log(arrayMap([3, 500, -10, 149, 53, 414, 1, 19]));




/* 3.Initialize two arrays. The first one should contain student names, the second one the number of points for each student. Display students' names with their corresponding grade. Use the following ranges:
51-60 -> 6,
61-70 -> 7,
71-80 -> 8,
81-90 -> 9,
91-100 -> 10.
Input : [ "Micahel", "Anne", "Frank", "Joe", "John", "David", "Mark", "Bill" ], [ 50, 39, 63, 72, 99, 51, 83, 59 ]
Output: Bill acquired 59 points and earned 6. Micahel acquired 50 points and failed to complete the exam.
*/


function gradeCounting(student, points) {
    var result = [];
    for (var i = 0; i < student.length; i++) {
        if (points[i] < 51) {
            result[i] = student[i] + " acquired " + points[i] + " points and failed to complete the exam.";
        } else if (points[i] >= 51 && points[i] < 60) {
            result[i] = student[i] + " acquired " + points[i] + " points and earned 6.";
        } else if (points[i] > 61 && points[i] < 70) {
            result[i] = student[i] + " acquired " + points[i] + " points and earned 7.";
        } else if (points[i] > 71 && points[i] < 80) {
            result[i] = student[i] + " acquired " + points[i] + " points and earned 8.";
        } else if (points[i] > 81 && points[i] < 90) {
            result[i] = student[i] + " acquired " + points[i] + " points and earned 9.";
        } else if (points[i] > 91 && points[i] <= 100) {
            result[i] = student[i] + " acquired " + points[i] + " points and earned 10.";
        }
    }
    return result;
}

console.log(gradeCounting(["Micahel", "Anne", "Frank", "Joe", "John", "David", "Mark", "Bill"], [50, 39, 63, 72, 99, 51, 83, 59]));




/* 4.Sort a previously defined array. Place its sorted values into a new array whose values are equivalent to the first array's values multiplied by 2.
Input: [ 13, 11, 15, 5, 6, 1, 8, 12 ]
Output: [ 2, 10, 12, 16, 22, 24, 26, 30 ]
*/


function sortAndDoublee(arr) {
    var newArray = [],
        position = 0;

    //make a copy of arr
    for (var i = 0; i < arr.length; i++) {
        newArray[i] = arr[i];
    }
    //sort and double
    for (var i = 0; i < newArray.length; i++) {
        position = i;
        for (var j = i; j < newArray.length; j++) {
            if (newArray[position] > newArray[j]) {
                position = j;
            }
        }
        var temp = newArray[position];
        newArray[position] = newArray[i];
        newArray[i] = temp * 2;
    }
    //return result
    return newArray;
}

console.log(sortAndDoublee([5, 4, 8, 3, 11, -2]));




/* 5.Sort a previously defined array in a descending order and display it in the console.
Input:  [ 13, 11, 15, 5, 6, 1, 8, 12 ]
Output: [ 15, 13, 12, 11, 8, 6, 5, 1 ]
*/


function descendingOrder(array) {
    var position;
    var temp;
    for (var i = 0; i < array.length; i++) {
        position = i;
        for (var j = i; j < array.length; j++) {
            if (array[position] < array[j]) {
                position = j;
            }
        }
        var temp = array[position];
        array[position] = array[i];
        array[i] = temp;
    }
    return array;
}

console.log(descendingOrder([13, 11, 15, 5, 6, 1, 8, 12]));




/* 6.Write a program that uses a loop to add all the even numbers from 1 to 1000 and subtracts all the odd numbers 1 to 500 from the calculated sum.The result should then be multiplied by 12.5 and displayed in console.
    Output: 2350000
*/


function loop() {
    var sumEven = 0;
    var sumOdd = 0;
    for (var i = 0; i <= 1000; i++) {
        if (i % 2 === 0) {
            sumEven += i;
        }
    }
    for (var i = 0; i < 500; i++) {
        if (i % 2 === 1) {
            sumOdd += i;
        }
    }
    return (sumEven - sumOdd) * 12.5;
}

console.log(loop());




/* 7. Define a 10 element array.Take the first two letters from every string(that has at least 2 letters) in the array and create a new string from them.Print it out in the console.
    Input: ["M", "Anne", 12, "Steve", "Joe", "John", "David", "Mark", true, "A"]
    Output: AnStJoJoDaMa
*/


function makeNewString(array) {
    var newString = "";
    for (var i = 0; i < array.length; i++) {
        if (typeof array[i] === "string" && array[i].length > 1) {
            newString += array[i][0] + array[i][1];
        }
    }
    return newString;
}

console.log(makeNewString(["M", "Anne", 12, "Steve", "Joe", "John", "David", "Mark", true, "A"]));




/* 8.Write a program that takes a string and prints its characters out in reversed order in the console.
    Input: Belgrade Institute of Technology
Output: ygolonhceT fo etutitsnI edargleB
*/


function reverseString(string) {
    var newString = "";
    for (var i = string.length - 1; i >= 0; i--) {
        newString += string[i];
    }
    return newString;
}

console.log(reverseString("Belgrade Institute of Technology"));




/* 9.Write a program that displays all the combinations of two numbers between 1 and 7. Don't display two of the same numbers at the same time. Display the number of possible combinations, as well. (E.g. (1.2),(2,1) is allowed, but not (1,1), (2,2)...).
*/


function displayCombinations() {
    var array = [];
    var index = 0;
    for (var i = 1; i < 8; i++) {
        for (var j = 1; j < 8; j++) {
            if (i !== j) {
                array[index] = [i, j];
                index++;
            }
        }
    }
    return array;
}

console.log(displayCombinations());


// or


function displayCombinations(number){
    var result = '';
    for(var i = 1; i <= number; i++){
        for(var j = 1; j <= number; j++){
            if(i != j){
                result += '(' + i + ' ,' + j + ')';
            }
        }
    }
    return result;
}

console.log(displayCombinations(7));




/* 10.Write a program that checks if the entered number is a prime number(i.e.divisible only by 1 and by itself).
    Input: 17 | 15
    Output: true | false
*/


function primeNumber(number) {
    if (number % number === 0 && number % 1 === 0 && number % 2 !== 0 && number % 3 !== 0) {
        return "True";
    } else {
        return "False";
    }
}

console.log(primeNumber(14));




/* 11.Check if a given string is a palindrome(spaces are ignored).
    Input: eye | Geek | a nut for a jar of tuna
Output: true | false | true
*/


function isPalindrome(string) {
    newString = "";
    for (var i = 0; i < string.length; i++) {
        if (string[i] !== " ") {
            newString += string[i];
        }
    }
    for (var i = 0, j = newString.length - 1; i <= j; i++ , j--) {
        if (newString[i] !== newString[j]) {
            return "False";
        }
    }
    return "True";
}

console.log(isPalindrome("a nut for a jar of tuna"));




/* 12.Write a program that calculates the greatest common divisor of two integers.Note: The greatest common divisor of two non - zero integers is the greatest positive number that divides both numbers with no remainder.
    Input: 192 42 | 81 9
Output: 6 | 9
*/


function greatestCommonDivisor(number1, number2) {
    var greatestCommonDivisor = 1;
    for (var i = 1; i <= number1 && i <= number2; i++) {
        if (number1 % i == 0 && number2 % i == 0) {
            greatestCommonDivisor = i;
        }
    }
    console.log(greatestCommonDivisor);
}

greatestCommonDivisor(192, 42);
greatestCommonDivisor(81, 9);


// or


function greatestCommonDivisor(number1, number2) {
    var min;
    var max;
    if (number1 > number2) {
        min = number2;
        max = number1;
    } else {
        min = number1;
        max = number2;
    }
    for (var i = min; i > 0; i--) {
        if (min % i === 0) {
            if (max % i === 0) {
                return i;
            }
        }
    }
}

console.log(greatestCommonDivisor(81, 9));
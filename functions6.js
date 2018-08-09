// 1.Write a function to count vowels in a provided string. If you are  not aware of indexOf function, try to use switch statement.


function countVowels(string) {
    var counter = 0;
    for (var i = 0; i < string.length; i++) {
        switch (string[i]) {
            case "a":
                counter++;
                break;
            case "e":
                counter++;
                break;
            case "i":
                counter++;
                break;
            case "o":
                counter++;
                break;
            case "u":
                counter++;
                break;
        }
    }
    return counter;
}

console.log(countVowels("Always something there to remind me"));




// 2.Write a function that combines two arrays by alternatingly taking elements.
// [‘a’,’b’,’c’], [1,2,3] -> [‘a’,1,’b’,2,’c’,3]


function combineArrays(array1, array2) {
    var newArray = [];
    var index = 0;
    for (var i = 0; i < array1.length; i++) {
        newArray[index] = array1[i];
        index++;
        newArray[index] = array2[i];
        index++;
    }
    return newArray;
}

console.log(combineArrays(["a", "b", "c"], [1, 2, 3]));




// 3.Write a function that rotates a list by k elements.
// For example [1,2,3,4,5,6] rotated by two becomes [3,4,5,6,1,2]



// 4.Write a function that takes a number and returns array of its digits.


function arrayOfDigits(number) {
    var tempString = '' + number,
        newArray = [];
    for (var i = 0; i < tempString.length; i++) {
        newArray[i] = parseInt(tempString[i]);
    }
    return newArray;
}

console.log(arrayOfDigits(355468));




// 5.Write a program that prints a multiplication table for numbers up to 12.


function printMuliplicationTable() {
    var result = "";
    for(var i = 1; i<13; i++) {
        for(var j = 1; j<13; j++) {
            result +=  i*j + "\t";
        }
        result+="\n";
    }
    return result;
}

console.log(printMuliplicationTable());




// 6.Write a function to input temperature in Centigrade and convert to Fahrenheit.


function CentigradeToFahrenheit(centigrade) {
    var fahrenheit = centigrade * 9 / 5 + 32;
    return fahrenheit;
}
console.log(CentigradeToFahrenheit(3));




// 7.Write a function to find the maximum element in array of numbers.Filter out all non - number elements.


function findMax(array) {
    var max = array[0];
    for (var i = 0; i < array.length; i++) {
        if (typeof array[i] === 'number' && !isNaN(array[i]) && array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

console.log(findMax([3, 5, false, 7, "d", undefined, NaN, 34, 65, null, 2]));




// 8.Write a function to find the maximum and minimum elements.Function returns an array.


function findMaxAndMin(array) {
    var min = array[0];
    var max = array[0];
    for (var i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        } else if (array[i] < min) {
            min = array[i];
        }
    }
    return [max, min];
}

console.log(findMaxAndMin([11, 773, 9, -2, 88]));




// 9.Write a function to find the median element of array.


function findMedian(array) {
    if (array.length % 2 === 0) {
        return [array[array.length / 2 - 1], array[array.length / 2]];
    } else {
        return array[(array.length - 1) / 2];
    }
}

console.log(findMedian([2, 34, 5, 77, 6, 3]));




// 10.Write a function to find the element that occurs most frequently.


function findMostFrequent(array) {
    var counter = 0;
    var max = 0;
    var mostFrequent;
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[i] === array[j]) {
                counter++;
            }
        }
        if (counter > max) {
            mostFrequent = array[i];
        }
    }
    return mostFrequent;
}

console.log(findMostFrequent([3, 4, 5, 4, 3, 6, 6, 6, 6, 3, 4, 3, 4, 4, 6]));




// 11.Write a function to find and return the first, middle and last element of an array if the array has odd number of elements.If number of elements is even, return just the first and the last.In other cases(empty array), input array should be returned.


function findElements(array) {
    if (array.length % 2 === 0) {
        return [array[0], array[array.length - 1]];
    } else {
        return [array[0], array[(array.length - 1) / 2], array[array.length - 1]];
    }
}
console.log(findElements([1, 2, 3, 4, 5, 6, 7]));




// 12.Write a function to find the average of N elements.Make the function flexible to receive dynamic number or parameters.


function findAverage() {
    var result = 0;
    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i] / arguments.length;
    }
    return result;
}

console.log(findAverage(3, 4, 5, 6, 7));




// 13.Write a function to find all the numbers greater than the average.


function findGreaterThenAverage(array) {
    var newArray = [];
    var sum = 0;
    var avg = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
    }
    avg = sum / array.length;
    for (i = 0; i < array.length; i++) {
        if (array[i] > avg) {
            newArray[newArray.length] = array[i];
        }
    }
    return newArray;
}

console.log(findGreaterThenAverage([1, 2, 3, 4, 5]));




// 14.The body mass index(BMI) is the ratio of the weight of a person(in kilograms) to the square of the height(in meters).Write a function that takes two parameters, weight and height, computes the BMI, and prints the corresponding BMI category:
// Starvation: less than 15
// Anorexic: less than 17.5
// Underweight: less than 18.5
// Ideal: greater than or equal to 18.5 but less than 25
// Overweight: greater than or equal to 25 but less than 30
// Obese: greater than or equal to 30 but less than 40
// Morbidly obese: greater than or equal to 40


function getBMI(weight, height) {
    var result = "";
    var bmi = weight / (height * height);
    if (bmi < 15) {
        result = "Starvation";
    } else if (bmi >= 15 && bmi < 17.5) {
        result = "Anorexic";
    } else if (bmi > 17.5 && bmi < 18.5) {
        result = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        result = "Ideal";
    } else if (bmi >= 25 && bmi < 30) {
        result = "Overweight";
    } else if (bmi >= 30 && bmi < 40) {
        result = "Obese";
    } else if (bmi >= 40) {
        result = "Morbidly obese";
    }
    return result;
}

console.log(getBMI(1100, 1.7));




// 15.Write a function that takes a list of strings and prints them, one per line, in a rectangular frame.:

// For example the list["Hello", "World", "in", "a", "frame"] gets printed as:
// *********
// * Hello *
// * World *
// * in    *
// * a *
// * frame *
// *********




// 1.Write a program that checks if a given element e is in the array a. 
// Input:  e = 3, a = [5, -4.2, 3, 7]
// Output: yes

// Input:  e = 3, a = [5, -4.2, 18, 7]
// Output: no


function isArrayElement(e, a) {
    for (var i = 0; i < a.length; i++) {
        if (i === e) {
            return "Yes";
        }
    }
    return "No";
}

console.log(isArrayElement(3, [5, -4.2, 3, 7]));




// 2.Write a program that multiplies every positive element of a given array by 2.
// Input array: [-3, 11, 5, 3.4, -8]
// Output array: [-3, 22, 10, 6.8, -8]


function multipliePositiveElements(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] > 0) {
            array[i] *= 2;
        }
    }
    return array;
}

console.log(multipliePositiveElements([-3, 11, 5, 3.4, -8]));




// 3.Write a program that finds the minimum of a given array and prints out its value and index. 
// Input array: [4, 2, 2, -1, 6]
// Output: -1, 3


function findMinimun(array) {
    var minimum = array[0];
    var index = 0;
    for (var i = 0; i < array.length; i++) {
        if (minimum > array[i]) {
            minimum = array[i];
            index = i;
        }
    }
    return "Minmum:" + minimum + ", index:" + index;
}

console.log(findMinimun([4, 2, 2, -1, 6]));




// 4.Write a program that finds the second smallest number and prints out its value. 
// Input array: [4, 2, 2, -1, 6]
// Output: 2







// 5.Write a program that calculates the sum of positive elements in the array.
// Input array: [3, 11, -5, -3, 2]
// Output: 16


function sumOfPositive(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] > 0) {
            sum += array[i];
        }
    }
    return sum;
}

console.log(sumOfPositive([3, 11, -5, -3, 2]));




// 6.Write a program that checks if a given array is symmetric. An array is symmetric if it can be read the same way both from the left and the right hand side.   
// Input array: [2, 4, -2, 7, -2, 4, 2]
// Output: The array is symmetric.

// Input array: [3, 4, 12, 8]
// 	Output: The array isn’t symmetric.


function isSymetric(array) {
    for (var i = 0, j = array.length - 1; i <= j; i++ , j--) {
        if (array[i] !== array[j]) {
            return "False";
        }
    }
    return "True";
}

console.log(isSymetric([3, 4, 12, 3]));




// 7.Write a program that intertwines two arrays. You can assume the arrays are of the same length. 
// Input arrays: [4, 5, 6, 2], [3, 8, 11, 9]
// Output array: [4, 3, 5, 8, 6, 11, 2, 9]


function intertwine2Arrays(array1, array2) {
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

console.log(intertwine2Arrays([4, 5, 6, 2], [3, 8, 11, 9]));




// 8.Write a program that concatenates two arrays. 
// Input arrays: [4, 5, 6, 2], [3, 8, 11, 9]
// Output array: [4, 5, 6, 2, 3, 8, 11, 9]


function concatenateArray(array1, array2) {
    var conArray = [],
        index = array1.length;
    for (i = 0; i < array1.length; i++) {
        conArray[i] = array1[i];
        if (i === array1.length - 1) {
            for (i = 0; i < array2.length; i++) {
                conArray[index] = array2[i];
                index++;
            }
        }
    }
    return conArray;
}

console.log(concatenateArray([4, 5, 6, 2], [3, 8, 11, 9]));




// 9.Write a program that deletes a given element e from the array a. 
// Input: e = 2, a = [4, 6, 2, 8, 2, 2]
// Output array: [4, 6, 8]


function deleteElement(e, a) {
    for (var i = 0; i < a.length; i++) {
        if (e === a[i]) {
            delete a[i];
        }
    }
    return a;
}

console.log(deleteElement(2, [4, 6, 2, 8, 2, 2]));




// 10.Write a program that inserts a given element e on the given position p in the array a. If the value of the position is greater than the array length, print the error message. 
// Input: e = 78, p = 3, a = [2, -2, 33, 12, 5, 8]
// Output: [2, -2, 33, 78, 12, 5, 8]


function insertElement(e, p, a) {
    for (var i = 0; i < a.length; i++) {
        if (i === p) {
            a[i] = e;
            return a;
        } else if (p > a.length) {
            return "Position is greater than the array length!";
        }
    }
}

console.log(insertElement(78, 3, [2, -2, 33, 12, 5, 8]));







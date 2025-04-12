const greet = require("./modules/greet");
const animationTime = require("./modules/renderTimeCalculator");

const message = greet('Rebecca');
console.log(message);
console.log("_________________");


const _ = require('lodash');

//3.2 Use lodash's chunk Function:
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const chunkedArray = _.chunk(array, 3);

console.log(chunkedArray);
console.log("_________________");

//3.3 Use lodash's shuffle Function:
const shuffledArray = _.shuffle(array);
console.log(shuffledArray);
console.log("_________________");

//3.4 Use lodash's uniq Function
const arrayWithDuplicates = [1, 2, 3, 4, 5, 6, 3, 4, 2, 1];
const uniqueArray = _.uniq(arrayWithDuplicates);
console.log('Unique Values:', uniqueArray);
console.log("_________________");

//3.5 Use lodash's sortBy Function
const people = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
    { name: 'Eve', age: 35 }
  ];

const sortedPeople = _.sortBy(people, 'age');
console.log('Sorted by Age:', sortedPeople);
console.log("_________________");

//4.2 Reading a File with fs
//created folder an file with some text in it
const fs = require('fs');

// asynchronous version
/* fs.readFile('./files/sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('[asynchronous version] Error reading the file:', err);
      return;
    }

    console.log('[asynchronous version] File content:', data);
  }); */

console.log("_________________");
// synchronous version
try {
    const data = fs.readFileSync('./files/sample.txt', 'utf8');
    console.log('[synchronous version] File content:', data);
  } catch (err) {
    console.error('[synchronous version] Error reading the file:', err);
  }

console.log("_________________");

const text = 'This is the content written to the output.txt file.';
try {
    const data2 = fs.writeFileSync('./files/output.txt', text, 'utf8');
    console.log('File has been written successfully!');
  } catch (err) {
    console.error('Error writing to the file:', err);
  }

//  4.4 Appending to a File (Optional)
const additionalText = '\nThis is additional content appended to the file.';
fs.appendFile('./files/output.txt', additionalText, 'utf8', (err) => {
    if (err) {
      console.error('Error appending to the file:', err);
      return;
    }
    console.log('Content has been appended successfully!');
    
    // Read the file to confirm the changes
    fs.readFile('./files/output.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }
      console.log('Final File Content:\n', data);
    });
  });
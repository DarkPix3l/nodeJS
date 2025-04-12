//Render Time Calculator

/* const frameTime = 5; //1 frame render time in minutes
const totalFrames = 500; //total amount of frames - Animation duration

//Estimation in min

const getAverageTime = totalFrames * frameTime;
console.log(
  `The render time of one frame is ${frameTime} minutes, the total amount of frames is ${totalFrames}. 
  Your animation should be finish in ${getAverageTime} minutes`
);

//Conversion in Hours and Seconds
// in case u want leave the computer over night and then turn off the computer using (shutdown /s /t "seconds") on windows
const convertSeconds = () => (getAverageTime * 60);
const convertHours = () => (getAverageTime / 60).toFixed(2);

console.log(
  `${getAverageTime} minutes are equal to: 
  ${convertHours()} Hours
  ${convertSeconds()} seconds`
); */

function calculateTotalTime(totalFrames, frameTime) {
  return totalFrames * frameTime;
}


function convertToSeconds(totalTimeInMinutes) {
  return totalTimeInMinutes * 60;
}


function convertToHours(totalTimeInMinutes) {
  return (totalTimeInMinutes / 60).toFixed(2);
}

module.exports = {
  calculateTotalTime,
  convertToSeconds,
  convertToHours,
};
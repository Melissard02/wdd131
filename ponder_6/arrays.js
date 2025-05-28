//  arrays.js
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>`;
}
const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join()
console.log("Melissa Dickerson")

const grades = ['A','B','A'];
function gradeToGPA(grade) {
  let points = 0
  if (grade === 'A') {
    points = 4;
  }
  else if (grade === 'B') {
    points = 3;
  }
  return points;
}
const gpaPoints = grades.map(gradeToGPA);
console.log(gpaPoints);

const pointsTotal = gpaPoints.reduce(function(total, item){
  return total + item;
});
const gpa = pointsTotal / gpaPoints.length;
console.log(gpa);

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const shortWords = words.filter(function (word){
  return word.length < 6;
});
console.log(shortWords)
console.log('Melissa Dickerson')

const myArray = [12, 34, 21, 54];
const luckyNumber = 21;
let luckyIndex = myArray.indexOf(luckyNumber);
console.log(luckyIndex)
console.log(luckyNumber)



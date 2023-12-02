const fs = require("fs");

let input = fs.readFileSync("input.txt").toString();

let calibration = input
  .split("\n")
  .map((line) => line.match(/\d/g))
  .map((digits) => +`${digits[0]}${digits[digits.length - 1]}`)
  .reduce((acc, x) => (acc += x));

console.log(calibration);

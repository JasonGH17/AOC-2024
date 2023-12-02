const fs = require("fs");

let input = fs.readFileSync("input.txt").toString();

let num_map = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let numify = (x) => (isNaN(+x) ? num_map[x] : +x);

let calibration = input
  .split("\n")
  .map((line) => {
    const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
    let regexc;
    let output = [];
    while ((regexc = regex.exec(line))) {
      if (regexc.index === regex.lastIndex) regex.lastIndex++;
      output.push(regexc[1]);
    } // Not as clean as I was hoping to make it
    return output;
  })
  .map((lines) => lines.map(numify))
  .map((digits) => +`${digits[0]}${digits[digits.length - 1]}`)
  .reduce((acc, x) => (acc += x));

console.log(calibration);

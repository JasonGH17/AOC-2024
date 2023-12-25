const fs = require("fs");

let sum = (x) => x.reduce((acc, x) => (acc += x));

let matches = fs
  .readFileSync("input.txt")
  .toString()
  .split(/\n|\r\n/)
  .map((x) =>
    x
      .split(/:|\|/)
      .slice(1)
      .map((x) => x.trim().split(/\s+/).map(Number))
  )
  .map(([wins, tries]) => tries.filter((x) => wins.includes(x)).length);

let copies = matches.map(() => 1);
matches.forEach((matches, i) => {
  while (matches) {
    copies[i + matches--] += copies[i];
  }
}); // Not as clean as I wanted it to be but I don't want to waste more time on this

console.log(sum(copies));

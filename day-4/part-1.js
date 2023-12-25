const fs = require("fs");

let sum = (x) => x.reduce((acc, x) => (acc += x));

let solution = sum(
  fs
    .readFileSync("input.txt")
    .toString()
    .split(/\n|\r\n/)
    .map((x) =>
      x
        .split(/:|\|/)
        .slice(1)
        .map((x) => x.trim().split(/\s+/).map(Number))
    )
    .map(([wins, tries]) => tries.filter((x) => wins.includes(x)).length)
    .map((x) => (x ? 2 ** (x - 1) : 0))
);

console.log(solution);

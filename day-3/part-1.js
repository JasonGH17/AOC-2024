const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString()
  .split(/(\n|\r\n)/)
  .filter((x) => !/(\n|\r\n)/.test(x))
  .map((x) => x.split(""));

const readNumber = (x, y) => {
  let out = "";
  while (!isNaN(+input[y][x])) x--;
  while (!isNaN(+input[y][x + 1])) {
    out += input[y][x + 1];
    input[y][x + 1] = ".";
    x++;
  }
  return +out;
};

let result = input
  .flatMap((row, ri) => {
    return row
      .map((col, ci) => (isNaN(col) && !". ".includes(col) ? [ci, ri] : null))
      .filter(Boolean);
  })
  .reduce((acc, [x, y]) => {
    if (!isNaN(+input[y - 1][x - 1])) acc += readNumber(x - 1, y - 1);
    if (!isNaN(+input[y - 1][x])) acc += readNumber(x, y - 1);
    if (!isNaN(+input[y - 1][x + 1])) acc += readNumber(x + 1, y - 1);
    if (!isNaN(+input[y][x - 1])) acc += readNumber(x - 1, y);
    if (!isNaN(+input[y][x + 1])) acc += readNumber(x + 1, y);
    if (!isNaN(+input[y + 1][x - 1])) acc += readNumber(x - 1, y + 1);
    if (!isNaN(+input[y + 1][x])) acc += readNumber(x, y + 1);
    if (!isNaN(+input[y + 1][x + 1])) acc += readNumber(x + 1, y + 1);
    return acc;
  }, 0);

console.log(result);

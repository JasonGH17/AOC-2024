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
      .map((col, ci) => (col === "*" ? [ci, ri] : null))
      .filter(Boolean);
  })
  .map(([x, y]) => {
    let out = [];
    if (!isNaN(+input[y - 1][x - 1])) out.push(readNumber(x - 1, y - 1));
    if (!isNaN(+input[y - 1][x])) out.push(readNumber(x, y - 1));
    if (!isNaN(+input[y - 1][x + 1])) out.push(readNumber(x + 1, y - 1));
    if (!isNaN(+input[y][x - 1])) out.push(readNumber(x - 1, y));
    if (!isNaN(+input[y][x + 1])) out.push(readNumber(x + 1, y));
    if (!isNaN(+input[y + 1][x - 1])) out.push(readNumber(x - 1, y + 1));
    if (!isNaN(+input[y + 1][x])) out.push(readNumber(x, y + 1));
    if (!isNaN(+input[y + 1][x + 1])) out.push(readNumber(x + 1, y + 1));
    return out;
  })
  .reduce((acc, res) => {
    if (res.length > 1) acc += res.reduce((acc, x) => acc * x, 1);
    return acc;
  }, 0);

console.log(result);

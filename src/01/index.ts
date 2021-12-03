/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');

const totalIncreasesSingle = (index: number, increases: number) => {
  if (index === input.length) {
    return increases;
  }

  const current = +input[index];
  const last = +input[index - 1];

  if (current > last) {
    return totalIncreasesSingle(index + 1, increases + 1);
  }

  return totalIncreasesSingle(index + 1, increases);
};

const totalIncreasesTriples = (index: number, increases: number) => {
  if (index + 3 > input.length) {
    return increases;
  }

  const lastStart = index - 1;
  const lastEnd = index + 2;
  const currentEnd = index + 3;

  const lastThreeSum = input.slice(lastStart, lastEnd).reduce((acc, curr) => +curr + acc, 0);
  const currentThreeSum = input.slice(index, currentEnd).reduce((acc, curr) => +curr + acc, 0);

  if (currentThreeSum > lastThreeSum) {
    return totalIncreasesTriples(index + 1, increases + 1);
  }

  return totalIncreasesTriples(index + 1, increases);
};

const answer = totalIncreasesSingle(1, 0);
const part2Answer = totalIncreasesTriples(1, 0);
console.log(answer, part2Answer);

/*
1
2
3
4
5
6

1 + 2 + 3 - 2 + 3 + 4
*/

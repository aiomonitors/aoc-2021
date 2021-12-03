/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const data: string[] = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');

const parseLine = (index: number): { verticalChange: number; horizontalChange: number } => {
  const splitInput = data[index].split(' ');
  const direction = splitInput[0];
  const value = +splitInput[1];

  switch (direction) {
    case 'forward':
      return { verticalChange: 0, horizontalChange: value };
    case 'up':
      return { verticalChange: -value, horizontalChange: 0 };
    case 'down':
      return { verticalChange: value, horizontalChange: 0 };
    default:
      return { verticalChange: 0, horizontalChange: 0 };
  }
};

const parseHorizontalAndDepth = (
  index: number,
  horizontalPosition = 0,
  verticalPosition = 0
): number => {
  if (index === data.length) {
    return horizontalPosition * verticalPosition;
  }

  const lineDetails = parseLine(index);

  return parseHorizontalAndDepth(
    index + 1,
    horizontalPosition + lineDetails.horizontalChange,
    verticalPosition + lineDetails.verticalChange
  );
};

const parseWithAim = (
  index: number,
  horizontalPosition = 0,
  verticalPosition = 0,
  aim = 0
): number => {
  if (index === data.length) {
    return horizontalPosition * verticalPosition;
  }

  const lineDetails = parseLine(index);

  return parseWithAim(
    index + 1,
    horizontalPosition + lineDetails.horizontalChange,
    verticalPosition + lineDetails.horizontalChange * aim,
    aim + lineDetails.verticalChange
  );
};

console.log(parseHorizontalAndDepth(0));
console.log(parseWithAim(0));

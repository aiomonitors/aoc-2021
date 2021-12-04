/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const initData: string[] = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')
  .split('\n');

const getMostCommonByIndex = (index: number, data: string[]): string => {
  const counts: { [key: string]: number } = {
    '0': 0,
    '1': 0,
  };

  data.forEach((item) => {
    counts[item[index]] += 1;
  });

  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
};

const getLeastCommonByIndex = (index: number, data: string[]): string => {
  const counts: { [key: string]: number } = {
    '0': 0,
    '1': 0,
  };

  data.forEach((item) => {
    counts[item[index]] += 1;
  });

  if (counts['0'] === counts['1']) {
    return '0';
  }

  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? b : a));
};

const getGamma = (): string => {
  const itemLength = initData[0].length;
  let result = '';

  for (let i = 0; i < itemLength; i += 1) {
    result += getMostCommonByIndex(i, initData);
  }

  return result;
};

const getEpsilon = (): string => {
  const itemLength = initData[0].length;
  let result = '';

  for (let i = 0; i < itemLength; i += 1) {
    result += getLeastCommonByIndex(i, initData);
  }

  return result;
};

const getOxygen = (index: number, data: string[]): string => {
  if (index === data[0].length) {
    console.log(data.length);
    return data[0];
  }

  const mostCommonForIndex = getMostCommonByIndex(index, data);

  return getOxygen(
    index + 1,
    data.filter((item) => item[index] === mostCommonForIndex)
  );
};

const getCO2 = (index: number, data: string[]): string => {
  if (index === data[0].length || data.length === 1) {
    console.log(data.length);
    return data[0];
  }

  const leastCommonForIndex = getLeastCommonByIndex(index, data);

  return getCO2(
    index + 1,
    data.filter((item) => item[index] === leastCommonForIndex)
  );
};

console.log(parseInt(getGamma(), 2) * parseInt(getEpsilon(), 2));
console.log(parseInt(getOxygen(0, initData), 2) * parseInt(getCO2(0, initData), 2));

/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';

const initData = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8');

const numbers = initData.split('\n')[0].split(',').map(Number);

type IBoardLine = { value: number; marked: boolean }[];
type IBoard = IBoardLine[];
type IBoards = IBoard[];

const parseBoards = (): IBoards => {
  const boards: IBoards = [];

  const splitData = initData.split('\n').slice(2);

  let currentBoard: IBoard = [];

  for (let i = 0; i < splitData.length; i += 1) {
    const lineVal = splitData[i];

    try {
      if (lineVal.length === 0) {
        boards.push(currentBoard);
        currentBoard = [];
        i += 1;
      }
    } catch (err) {
      console.log(err);
    }

    const boardLine: IBoardLine = [];
    splitData[i].split(' ').forEach((item) => {
      const line = {
        value: +item,
        marked: false,
      };
      if (item.length !== 0) {
        boardLine.push(line);
      }
    });

    currentBoard.push(boardLine);

    if (i + 1 === splitData.length) {
      boards.push(currentBoard);
      break;
    }
  }

  return boards;
};

const boards: IBoards = parseBoards();

const markBoards = (index: number, num: number): void => {
  for (const line of boards[index]) {
    for (const item of line) {
      if (item.value === num) {
        item.marked = true;
      }
    }
  }
};

const checkBoardWinningRows = (index: number): boolean => {
  for (const line of boards[index]) {
    const isRowAllMarked = line.every((item) => item.marked);
    if (isRowAllMarked) {
      return true;
    }
  }
  return false;
};

const checkBoardWinningColumns = (index: number): boolean => {
  for (const line of transformBoardColumns(index)) {
    const isRowAllMarked = line.every((item) => item.marked);
    if (isRowAllMarked) {
      return true;
    }
  }
  return false;
};

const transformBoardColumns = (index: number): IBoard => {
  const columnBoard: IBoard = [];
  const board = boards[index];
  const columnLength = board[0].length;
  const rowLength = board.length;

  for (let j = 0; j < columnLength; j += 1) {
    const column: IBoardLine = [];
    for (let i = 0; i < rowLength; i += 1) {
      column.push(board[i][j]);
    }
    columnBoard.push(column);
  }
  return columnBoard;
};

const prettyPrintBoard = (board: IBoard): void => {
  for (const line of board) {
    const row = `${line.map((item) => `${item.marked ? 'M' : ''}${item.value}`).join(' ')} \n`;
    console.log(row);
  }
};

const getSumUnmarked = (board: IBoard): number => {
  let total = 0;
  for (const line of board) {
    for (const item of line) {
      if (!item.marked) {
        total += item.value;
      }
    }
  }

  return total;
};

const runGame = (): void => {
  for (let i = 0; i < numbers.length; i += 1) {
    const num = numbers[i];
    for (let j = 0; j < boards.length; j += 1) {
      markBoards(j, num);
      if (checkBoardWinningRows(j) || checkBoardWinningColumns(j)) {
        console.log(`Number ${num} is winning for board ${j}`);

        prettyPrintBoard(boards[j]);
        console.log(getSumUnmarked(boards[j]) * num);
      }
    }
  }
};

const runGameLast = (): void => {
  let currentNumIndex = 0;
  const boardsWon: number[] = [];
  const winningSums: number[] = [];
  while (
    boards.length > 1 &&
    currentNumIndex < numbers.length &&
    boardsWon.length < boards.length
  ) {
    const num = numbers[currentNumIndex];
    for (let j = 0; j < boards.length; j += 1) {
      markBoards(j, num);
      if (checkBoardWinningRows(j) || checkBoardWinningColumns(j)) {
        if (!boardsWon.includes(j)) {
          boardsWon.push(j);
          winningSums.push(getSumUnmarked(boards[j]) * num);
        }
      }
    }

    currentNumIndex += 1;
  }

  console.log(boardsWon, winningSums);
};

// runGame();
runGameLast();

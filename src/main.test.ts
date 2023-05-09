import { VERTICAL_DELIMITER, delimiterRow } from './constants';
import {
  IValue,
  createEmptyBoard,
  deepCopy,
  enterBoardValue,
  getImpactedCoords,
  getSolutions,
  presentBoard,
} from './main';

describe('getSolutions', () => {
  test('basic case', () => {
    const board = createEmptyBoard();
    expect(getSolutions(board)).toStrictEqual([]);
  });
});

describe('enterBoardValue', () => {
  it('basic case', () => {
    const board = createEmptyBoard();
    enterBoardValue(board, 2, 1, IValue.two);

    const impactedCells = getImpactedCoords(2, 1);

    expect(board[1][2].value).toBe(IValue.two);
    impactedCells.forEach(([x, y]) => {
      expect(board[y][x].options[IValue.two]).toBe(false);
    });
  });
});

describe('getImpactedCoords', () => {
  it('basic case', () => {
    expect(getImpactedCoords(2, 1)).toStrictEqual([
      // zone
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      // row
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [8, 1],
      // column
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
    ]);
  });
});

describe('presentBoard', () => {
  it('handles empty board', () => {
    const emptyRow = `   ${VERTICAL_DELIMITER}   ${VERTICAL_DELIMITER}   `;
    expect(presentBoard(createEmptyBoard())).toStrictEqual([
      emptyRow,
      emptyRow,
      emptyRow,
      delimiterRow,
      emptyRow,
      emptyRow,
      emptyRow,
      delimiterRow,
      emptyRow,
      emptyRow,
      emptyRow,
    ]);
  });

  it('handles not empty board', () => {
    const board = createEmptyBoard();

    board.forEach((row) => {
      row.forEach((cell, cell_i) => {
        cell.value = cell_i + 1;
      });
    });

    const testRow = `123${VERTICAL_DELIMITER}456${VERTICAL_DELIMITER}789`;
    expect(presentBoard(board)).toStrictEqual([
      testRow,
      testRow,
      testRow,
      delimiterRow,
      testRow,
      testRow,
      testRow,
      delimiterRow,
      testRow,
      testRow,
      testRow,
    ]);
  });
});

describe('deepCopy', () => {
  it('nested objects are not the same', () => {
    const object = {
      child: {
        grandChild: {
          name: 'test-name',
        },
      },
    };
    const copy = deepCopy(object);

    expect(copy.child.grandChild.name).toBe(object.child.grandChild.name);
    expect(copy.child.grandChild).not.toBe(object.child.grandChild);
  });
});

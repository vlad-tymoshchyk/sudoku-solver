import { VERTICAL_DELIMITER, delimiterRow } from './constants';

export const EMPTY = ' ';

export enum IValue {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
  nine = 9,
}

export type IOptions = {
  [IValue.one]: boolean;
  [IValue.two]: boolean;
  [IValue.three]: boolean;
  [IValue.four]: boolean;
  [IValue.five]: boolean;
  [IValue.six]: boolean;
  [IValue.seven]: boolean;
  [IValue.eight]: boolean;
  [IValue.nine]: boolean;
};

export type IBoard = Array<
  Array<{
    value: IValue | typeof EMPTY;
    options: IOptions;
  }>
>;

export const getSolutions = (board: IBoard): IBoard[] => {
  return [];
};

export const presentBoard = (board: IBoard): string[] => {
  return board.flatMap((row, row_i) => {
    const rowPresentation = row
      .flatMap((cell, cell_i) => {
        const returnArray = [cell.value + ''];

        if (cell_i === 2 || cell_i === 5) {
          returnArray.push(VERTICAL_DELIMITER);
        }

        return returnArray;
      })
      .join('');

    const returnArray = [rowPresentation];

    if (row_i === 2 || row_i === 5) {
      returnArray.push(delimiterRow);
    }

    return returnArray;
  });
};

export const createEmptyBoard = (): IBoard => {
  return Array(9)
    .fill(null)
    .map(() => {
      return Array(9)
        .fill(null)
        .map(() => ({
          value: EMPTY,
          options: {
            [IValue.one]: true,
            [IValue.two]: true,
            [IValue.three]: true,
            [IValue.four]: true,
            [IValue.five]: true,
            [IValue.six]: true,
            [IValue.seven]: true,
            [IValue.eight]: true,
            [IValue.nine]: true,
          },
        }));
    });
};

export const deepCopy = <T>(object: T): T => {
  return JSON.parse(JSON.stringify(object));
};

export const enterBoardValue = (
  board: IBoard,
  x: number,
  y: number,
  value: IValue
): void => {
  board[y][x].value = value;
  getImpactedCoords(x, y).forEach(([x, y]) => {
    board[y][x].options[value] = false;
  });
};

export const getImpactedCoords = (x: number, y: number): [number, number][] => {
  return [
    ...getZoneImpactedCoords(x, y),
    ...getRowImpactedCoords(x, y),
    ...getColumnImpactedCoords(x, y),
  ];
};

export const getZoneImpactedCoords = (
  coord_x: number,
  coord_y: number
): [number, number][] => {
  const zone_Ys = getZone(coord_y);
  const zone_Xs = getZone(coord_x);

  return zone_Ys
    .flatMap((y) => {
      return zone_Xs.map((x) => [x, y] as [number, number]);
    })
    .filter(([x, y]) => !(x === coord_x && y === coord_y));
};

export const getZone = (coord: number): number[] => {
  switch (true) {
    case 0 <= coord && coord < 3:
      return [0, 1, 2];
    case 3 <= coord && coord < 6:
      return [3, 4, 5];
    case 6 <= coord && coord < 9:
      return [6, 7, 8];
    default:
      throw new Error(`Coord "${coord}" is not in 0..8 range`);
  }
};

export const getNotZone = (coord: number): number[] => {
  switch (true) {
    case 0 <= coord && coord < 3:
      return [3, 4, 5, 6, 7, 8];
    case 3 <= coord && coord < 6:
      return [0, 1, 2, 6, 7, 8];
    case 6 <= coord && coord < 9:
      return [0, 1, 2, 3, 4, 5];
    default:
      throw new Error(`Coord "${coord}" is not in 0..8 range`);
  }
};

export const getRowImpactedCoords = (
  coord_x: number,
  coord_y: number
): [number, number][] => {
  return getNotZone(coord_x).map((x) => [x, coord_y]);
};

export const getColumnImpactedCoords = (
  coord_x: number,
  coord_y: number
): [number, number][] => {
  return getNotZone(coord_y).map((y) => [coord_x, y]);
};

export class Cell {
  isVisited: number;
  isVisible: number;
  isBomb: number;
  isFlagged: number;
  value: number;
}

export class Grid {
  grid: Cell[][];
}

export interface LeftClick {
  row: number;
  col: number;
  voluntary: boolean;
}

export interface RightClick {
  row: number;
  col: number;
}
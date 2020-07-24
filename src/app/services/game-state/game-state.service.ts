import { Injectable } from '@angular/core';

import { Grid, Cell } from '../../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  constructor() {}

  createCell(): Cell {
    return {
      isVisited: 0,
      isVisible: 0,
      isBomb: 0,
      isFlagged: 0,
      value: -1,
    };
  }

  createGrid(): Grid {
    return {
      grid: Array.from(Array(9), () => Array.from(Array(9), () => Object.assign({}, this.createCell()))),
    };
  }

  assignBombs({ grid }, bombCount): Grid {
    let g = JSON.parse(JSON.stringify(grid));
    let i = 0;
    while (i < bombCount) {
      let p = Math.floor(Math.random() * 9);
      let q = Math.floor(Math.random() * 9);
      if (g[p][q].isBomb != 1) {
        g[p][q].isBomb = 1;
        i += 1;
      }
    }

    return {
      grid: g,
    };
  }

  leftClick(gridObj, row, col, voluntary?): { isGameOver: boolean; grid: Grid } {
    let grid = JSON.parse(JSON.stringify(gridObj));
    let isGameOver = false;

    let recursiveCheck = (grid, row, col, voluntary?) => {
      let cell = grid[row][col];
      if (!cell.isFlagged && !cell.isVisited) {
        cell.isVisited = 1;
        cell.isVisible = 1;

        if (!!voluntary && !!cell.isBomb) {
          this.reveal(grid);
          setTimeout(() => alert('Game Over'), 0);
          isGameOver = true;
          return;
        }

        let neighbors = this.resolveNeighbors(grid, row, col);
        let neighborBombCount = this.checkBombCount(grid, neighbors);
        grid[row][col].value = neighborBombCount;

        if (!neighborBombCount)
          neighbors.forEach((ele) => {
            recursiveCheck(grid, ele[0], ele[1], false);
          });
      }

      return;
    };

    recursiveCheck(grid, row, col, voluntary);

    return {
      isGameOver,
      grid: {
        grid: grid,
      },
    };
  }

  rightClick(gridObj, row, col): Grid {
    let grid = JSON.parse(JSON.stringify(gridObj));

    let cell = grid[row][col];
    if (!cell.isVisited) {
      cell.isFlagged = !cell.isFlagged;
    }

    return {
      grid: grid,
    };
  }

  resolveNeighbors(grid, r: number, c: number) {
    let neighbors = [];
    for (let i = r - 1; i <= r + 1; i++) {
      if (i >= 0 && i < grid.length) {
        for (let j = c - 1; j <= c + 1; j++) {
          if (j >= 0 && j < grid.length) {
            if (i != r || j != c) {
              neighbors.push([i, j]);
            }
          }
        }
      }
    }
    return neighbors;
  }

  checkBombCount(grid, arr: any[]) {
    let count = 0;
    return arr.reduce((acc, cell: any) => {
      if (grid[cell[0]][cell[1]].isBomb) {
        acc += 1;
      }
      return acc;
    }, count);
  }

  checkWinCondition({ bombCount, isCompleted, grid }) {
    let count = bombCount;
    grid.forEach((row) => {
      row.forEach((ele: Cell) => {
        if (ele.isFlagged && ele.isBomb) {
          count--;
        }
      });
    });

    if (!count) {
      setTimeout(() => alert('You won'), 0);
      isCompleted = true;
    }
    return {
      isCompleted: isCompleted,
    };
  }

  reveal(grid) {
    grid.forEach((row) => {
      row.forEach((ele: Cell) => {
        if (ele.isBomb) ele.isVisible = 1;
      });
    });
  }
}

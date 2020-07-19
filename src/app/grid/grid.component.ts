import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent implements OnInit {
  grid: any = [];
  flagCount: number = 10;

  cellObj: cellObj = {
    isVisited: 0,
    isVisible: 0,
    isBomb: 0,
    isFlagged: 0,
    value: -1,
  };

  isGameOver: boolean;
  isWinCondition: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.grid = Array.from(Array(9), () =>
      Array.from(Array(9), () => Object.assign({}, this.cellObj))
    );

    this.assignBombs();
  }

  assignBombs() {
    let i = 0;
    while (i < this.flagCount) {
      let p = Math.floor(Math.random() * 9);
      let q = Math.floor(Math.random() * 9);
      this.grid[p][q].isBomb = 1;
      i += 1;
    }
  }

  leftClick(row, col, voluntary?) {
    let cell = this.grid[row][col];
    if (!cell.isFlagged && !cell.isVisited) {
      cell.isVisited = 1;
      cell.isVisible = 1;

      if (!!voluntary && !!cell.isBomb) {
        alert("Game Over");
        this.isGameOver = true;
        this.reveal();
        return;
      }

      let neighbors = this.resolveNeighbors(row, col);
      let neighborBombCount = this.checkBombCount(neighbors);
      this.grid[row][col].value = neighborBombCount;

      if (!neighborBombCount)
        neighbors.forEach((ele) => {
          this.leftClick(ele[0], ele[1], false);
        });
    }
  }

  toggleFlag(cell) {
    if (!cell.isVisited) {
      cell.isFlagged = !cell.isFlagged;
      this.checkWinCondition();
    }
  }

  resolveNeighbors(r, c) {
    let neighbors = [];
    for (let i = r - 1; i <= r + 1; i++) {
      if (i >= 0 && i < this.grid.length) {
        for (let j = c - 1; j <= c + 1; j++) {
          if (j >= 0 && j < this.grid.length) {
            if (i != r || j != c) {
              neighbors.push([i, j]);
            }
          }
        }
      }
    }
    return neighbors;
  }

  checkWinCondition() {
    let count = this.flagCount;
    this.grid.forEach((row) => {
      row.forEach((ele: cellObj) => {
        console.log(ele, count);
        if (ele.isFlagged && ele.isBomb) {
          count--;
        }
      });
    });

    console.log(count);

    if (!count) {
      alert("You won");
      this.isGameOver = true;
    }
  }

  checkBombCount(arr: any[]) {
    let count = 0;
    return arr.reduce((acc, cell: any) => {
      if (this.grid[cell[0]][cell[1]].isBomb) {
        acc += 1;
      }
      return acc;
    }, count);
  }

  reveal() {
    this.grid.forEach((row) => {
      row.forEach((ele: cellObj) => {
        ele.isVisible = 1;
        ele.value = ele.value < 0 ? 0 : ele.value;
      });
    });
  }
}

interface cellObj {
  isVisited: number;
  isVisible: number;
  isBomb: number;
  isFlagged: number;
  value: number;
}

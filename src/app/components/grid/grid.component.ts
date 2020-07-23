import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import GameState from 'src/app/state/game.state';
import { LeftClickGameAction, RightClickGameAction, CheckWinConditionGameAction } from 'src/app/actions/game.action';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  app: Observable<GameState>;
  grid: any;
  flagCount: number = 10;

  gridSubscription: Subscription;

  isGameOver: boolean;
  isWinCondition: boolean = false;

  constructor(private store: Store<{ app: GameState }>) {
    this.app = store.pipe(select('app'));
    this.gridSubscription = this.app.subscribe((gameState: GameState) => {
      this.grid = gameState.game?.grid;
    });
  }

  ngOnInit() {}

  leftClick(row, col, voluntary) {
    this.store.dispatch(LeftClickGameAction({ row, col, voluntary }));
  }

  rightClick(row, col) {
    this.store.dispatch(RightClickGameAction({ row, col }));
    this.store.dispatch(CheckWinConditionGameAction()); //this.checkWinCondition();
  }
}

//

//   reveal() {
//     this.grid.forEach((row) => {
//       row.forEach((ele: cellObj) => {
//         ele.isVisible = 1;
//         ele.value = ele.value < 0 ? 0 : ele.value;
//       });
//     });
//   }
// }

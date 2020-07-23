import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import GameState from './state/game.state';
import { Observable, Subscription } from 'rxjs';
import { CreateGameAction, AssignBombsGameAction } from './actions/game.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'minesweeper';

  app: Observable<GameState>;
  appSubscription: Subscription;

  // Props
  playCount: number;
  wonCount: number;
  lossCount: number;
  isCompleted: boolean;

  constructor(
    private store: Store<{ app: GameState }>
  ) {
    this.app = store.pipe(select('app'));
  }

  ngOnInit() {
    this.appSubscription = this.app.subscribe((gameState: GameState) => {
      this.playCount = gameState.playCount;
      this.wonCount = gameState.wonCount;
      this.lossCount = gameState.lossCount;
      this.isCompleted = gameState.isCompleted;
    });
  }

  newGame() {
    this.store.dispatch(CreateGameAction());
    this.store.dispatch(AssignBombsGameAction());
  }

  ngOnDestroy() {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
  }
}

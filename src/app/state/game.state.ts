import { Grid, Cell } from '../models/game.model';

export default class GameState {
  game: Grid;
  playCount: number;
  wonCount: number;
  lossCount: number;
  isCompleted: boolean;
  bombCount: number;

  constructor() {
    this.playCount = 0;
    this.wonCount = 0;
    this.lossCount = 0;
    this.isCompleted = true;
    this.bombCount = 10;
    this.game = null;
  }
}

export const initializeState = (): GameState => {
  return new GameState();
};





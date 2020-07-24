import { Action, createReducer, on } from '@ngrx/store';
import GameState, { initializeState } from '../state/game.state';
import {
  GetGameAction,
  CreateGameAction,
  AssignBombsGameAction,
  LeftClickGameAction,
  RightClickGameAction,
  CheckWinConditionGameAction,
} from 'src/app/actions/game.action';

import { GameStateService } from '../services/game-state/game-state.service';

export const initialState = initializeState();

export const gameStateSvc = new GameStateService();

const reducer = createReducer(
  initialState,
  on(GetGameAction, (state: GameState) => state),
  on(CreateGameAction, (state: GameState) => {
    return {
      ...state,
      playCount: state.playCount + 1,
      isCompleted: false,
      game: gameStateSvc.createGrid(),
    };
  }),
  on(AssignBombsGameAction, (state: GameState) => {
    return {
      ...state,
      game: gameStateSvc.assignBombs(state.game, state.bombCount),
    };
  }),
  on(LeftClickGameAction, (state, { row, col, voluntary }) => {
    let { isGameOver, grid } = gameStateSvc.leftClick(state.game.grid, row, col, voluntary);

    if (isGameOver) {
      return {
        ...state,
        isCompleted: true,
        lossCount: state.lossCount + 1,
        game: grid,
      };
    }

    return {
      ...state,
      game: grid,
    };
  }),
  on(RightClickGameAction, (state, { row, col }) => {
    return {
      ...state,
      game: gameStateSvc.rightClick(state.game.grid, row, col),
    };
  }),
  on(CheckWinConditionGameAction, (state: GameState) => {
    let { isCompleted } = gameStateSvc.checkWinCondition({
      bombCount: state.bombCount,
      isCompleted: state.isCompleted,
      grid: state.game.grid,
    });

    return {
      ...state,
      wonCount: !!isCompleted ? state.wonCount + 1 : state.wonCount,
      isCompleted: isCompleted,
    };
  })
);

export function GameReducer(state: GameState | undefined, action: Action) {
  return reducer(state, action);
}

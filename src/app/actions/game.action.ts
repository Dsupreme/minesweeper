import { createAction, props } from '@ngrx/store';
import { LeftClick, RightClick } from '../models/game.model';

export const GetGameAction = createAction('[Game] - Get Game');

export const CreateGameAction = createAction('[Game] - Create Game');

export const AssignBombsGameAction = createAction('[Game] - Assign Bombs');

export const LeftClickGameAction = createAction('[Game] - Left Click', props<LeftClick>());

export const RightClickGameAction = createAction('[Game] - Right Click', props<RightClick>());

export const CheckWinConditionGameAction = createAction('[Game] - Check Win Condition');

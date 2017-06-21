import { type } from '../util';
import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const ActionTypes = {
  LOAD:             type('[User] Load'),
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: User) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
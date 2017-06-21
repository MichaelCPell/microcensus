import { type } from '../util';
import { Action } from '@ngrx/store';
import { User } from '../users/user';

export const ActionTypes = {
  LOAD:             type('[User] Load'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */


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
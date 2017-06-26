import { type } from '../util';
import { Action } from '@ngrx/store';
import { Location } from '../models/location';

export const ActionTypes = {
  SET:             type('[Locations] Set'),
};

export class SetAction implements Action {
  type = ActionTypes.SET;

  constructor(public payload: Location[]) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SetAction
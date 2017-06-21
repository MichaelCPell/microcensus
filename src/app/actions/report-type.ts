import { type } from '../util';
import { Action } from '@ngrx/store';
import { ReportType } from '../models/report-type'



export const ActionTypes = {
  ADD:             type('[ReportType] Add'),
};

export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: ReportType[]) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = AddAction
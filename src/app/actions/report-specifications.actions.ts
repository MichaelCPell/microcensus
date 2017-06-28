import { type } from '../util';
import { Action } from '@ngrx/store';
import { ReportSpecification } from '../models/report-specification';

export const ActionTypes = {
  SET_REPORT_TYPE:             type('[ReportSpecification] Set Report Type'),
  SET_GEOMETRY:             type('[ReportSpecification] Set Geometry'),
  SET_RADIUS:             type('[ReportSpecification] Set Radius'),
};

export class SetReportTypeAction implements Action {
  type = ActionTypes.SET_REPORT_TYPE;

  constructor(public payload: string) { }
}

export class SetGeometryAction implements Action {
  type = ActionTypes.SET_GEOMETRY;

  constructor(public payload: undefined) { }
}

export class SetRadiusAction implements Action {
  type = ActionTypes.SET_RADIUS;

  constructor(public payload: number) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SetReportTypeAction | SetGeometryAction | SetRadiusAction
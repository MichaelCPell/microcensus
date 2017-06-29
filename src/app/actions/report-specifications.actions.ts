import { type } from '../util';
import { Action } from '@ngrx/store';
import { ReportSpecification } from '../models/report-specification';
import { ReportType } from '../models/report-type';

export const ActionTypes = {
  SET_REPORT_TYPE:              type('[ReportSpecification] Set Report Type'),
  SET_GEOMETRY:                 type('[ReportSpecification] Set Geometry'),
  SET_RADIUS:                   type('[ReportSpecification] Set Radius'),
  SET_LOCATION:                 type('[ReportSpecification] Set Location')
};

export class SetReportTypeAction implements Action {
  type = ActionTypes.SET_REPORT_TYPE;

  constructor(public payload: any) { }
}

export class SetGeometryAction implements Action {
  type = ActionTypes.SET_GEOMETRY;

  constructor(public payload: undefined) { }
}

export class SetRadiusAction implements Action {
  type = ActionTypes.SET_RADIUS;

  constructor(public payload: number) { }
}

export class SetLocationAction implements Action {
  type = ActionTypes.SET_LOCATION;

  constructor(public payload: {coordinates:string[], address: string}) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SetReportTypeAction | SetGeometryAction | SetRadiusAction | SetLocationAction
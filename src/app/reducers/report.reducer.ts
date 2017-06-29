import * as report from '../actions/report.actions';
import { ReportTypeService} from '../services/report-type.service'
import { ReportType } from "../models/report-type";

export interface State {
    data: any,
    reportSpecification: any
};

export const initialState: State = {
  data: undefined,
  reportSpecification: undefined
};

// reducer, think of it as a table in the db
export function reducer(state = initialState, action: report.Actions ): State {
  switch (action.type) {
    case report.ActionTypes.ADD: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}

export const get = (state: State) => state;




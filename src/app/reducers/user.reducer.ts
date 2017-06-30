import { User } from "../models/user";
import * as user from '../actions/user';
import { ReportTypeService} from '../services/report-type.service'
import { ReportType } from "../models/report-type";

export interface State {
  email: string;
  reportTypes: ReportType[];
  sub:string;
  locations: any[];
};

export const initialState: State = {
  email: undefined,
  reportTypes: ReportTypeService.defaultReportTypes,
  sub: undefined,
  locations: []
};

// reducer, think of it as a table in the db
export function reducer(state = initialState, action: user.Actions ): State {
  switch (action.type) {
    case user.ActionTypes.LOAD: {
      let user:User = action.payload

      return {
        ...state,
        email: user.email,
        locations: state.locations.concat(user.email),
        reportTypes: state.reportTypes.concat(user.reportTypes)
      }
    }
    case user.ActionTypes.SIGNOUT: {
      const user = action.payload;
      return initialState
    }
    case user.ActionTypes.SET_SUB: {
      return {...initialState, sub: action.payload.sub}
    }

    default: {
      return state;
    }
  }
}

export const get = (state: State) => state;
export const getEmail = (state: State) => state.email;
export const getReportTypes = (state: State) => state.reportTypes;
export const getSub = (state: State) => state.sub;

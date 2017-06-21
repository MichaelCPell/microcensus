import { ReportType } from '../models/report-type';
import { ReportTypeService } from '../services/report-type.service';
import * as reportType from '../actions/report-type';

export interface State {
  all: ReportType[],
  active: ReportType
};

export const initialState: State = {
    all: ReportTypeService.defaultReportTypes,
    active: ReportTypeService.defaultReportTypes[0]
};

// reducer, think of it as a table in the db
export function reducer(state = initialState, action: reportType.Actions ): State {
  console.log("REDUCER WAS CALLED")
  switch (action.type) {
    case reportType.ActionTypes.ADD: {
      const reportTypes = action.payload;
      return {...state, all: this.all.concat(reportTypes) } 
    }
    case reportType.ActionTypes.SET_ACTIVE: {
      const reportType:ReportType = action.payload;
      return {...state, active: reportType}
    }

    default: {
      return state;
    }
  }
}

export const getAll = (state: State) => {
  console.log(`users.getCurrent was called`)
  console.log(`state in users.getCurrent `)
  return state.all
};


export const getActive = (state: State) => state.active
// Selectors (think of them as queries)
// export const getEntities = (state: State) => state.entities;

// export const getIds = (state: State) => state.ids;

// export const getSelectedId = (state: State) => state.selectedBookId;

// export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
//   return entities[selectedId];
// });

// export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
//   return ids.map(id => entities[id]);
// });
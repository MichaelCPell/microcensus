import { Location } from '../models/location';
// import { ReportTypeService } from '../services/report-type.service';
import * as reportSpecifications from '../actions/report-specifications.actions';

export interface State {
  reportType: string
  geoJSON: any;
};

export const initialState: State = {
  reportType: undefined,
  geoJSON: {
      geometry: {
        radius: 1600,
        type: "Point"
      },
      type: "Feature"
  }
};

// reducer, think of it as a table in the db
export function reducer(state = initialState, action: reportSpecifications.Actions ): State {
  switch (action.type) {
    case reportSpecifications.ActionTypes.SET_REPORT_TYPE: {
      return state 
    }

    case reportSpecifications.ActionTypes.SET_RADIUS: {

      return {...state, 
              geoJSON: {
                geometry: {
                  radius: action.payload
                }
              }
            } 
    }

    default: {
      return state;
    }
  }
}

export const get = (state: State) => state
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
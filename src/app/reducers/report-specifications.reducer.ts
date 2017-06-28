import { Location } from '../models/location';
import { ReportType } from '../models/report-type';
import { ReportTypeService } from '../services/report-type.service';
import * as reportSpecifications from '../actions/report-specifications.actions';

export interface State {
  reportType: ReportType
  geoJSON: any;
};

export const initialState: State = {
  reportType: ReportTypeService.defaultReportTypes[0],
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
      let reportType:ReportType = action.payload
      return {...state, reportType: reportType}
    }

    case reportSpecifications.ActionTypes.SET_RADIUS: {

      return {...state, 
              geoJSON: {
                geometry: {
                  coordinates: state.geoJSON.geometry.coordinates,
                  radius: action.payload
                },
                properties: state.geoJSON.properties
              }
            } 
    }

    case reportSpecifications.ActionTypes.SET_LOCATION: {

      return {...state, 
              geoJSON: {
                geometry: {
                  coordinates: action.payload.coordinates,
                  radius: state.geoJSON.geometry.radius
                },
                properties: {
                  address: action.payload.address
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
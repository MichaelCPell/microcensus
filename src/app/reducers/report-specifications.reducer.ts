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
      type: "Feature",
      properties: {}
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
                  radius: action.payload,
                  type: "Point"
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
                  radius: state.geoJSON.geometry.radius,
                  type: state.geoJSON.geometry.type
                },
                properties: {
                  address: action.payload.address
                }
              }
            } 
    }


    case reportSpecifications.ActionTypes.SET_GEOJSON: {
      return {...state, 
              geoJSON: action.payload
            } 
    }

    case reportSpecifications.ActionTypes.SET_ADDRESS: {
      return {...state, 
              geoJSON: {...state.geoJSON,
                properties: {
                  address: action.payload
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

import * as report from '../actions/report.actions';
import { ReportTypeService} from '../services/report-type.service'
import { ReportType } from "../models/report-type";
const tempObject = {
	"data": {
		"race": {
			"White": 1147.38666423736,
			"Black or African American": 3411.342271810428,
			"Asian": 43.912134678572116
		},
		"latino": {
			"Latino": 1444.835184933315,
			"Non-Latino": 4107.990373579649
		},
		"homes": {
			"Owner Occupied": 2370.1064632626394,
			"Renter Occupied": 3160.023327447312
		},
		"education": {
			"Did Not Finish High School": 947.0488419559184,
			"High School or GED": 1951.4808238249166,
			"Bachelor's degree": 414.94980800911685,
			"Master's or Professional": 31.370619692883718,
			"Doctorate degree": 0
		},
		"population": {
			"0To25": 2194.0244226934196,
			"25To65": 2896.0563435070208,
			"65Plus": 448.7937499758143,
			"total": 5538.874516176255
		},
		"median_income": 32500,
		"housing": {
			"numberOfHouseholds": 804.9980285636257,
			"median": 95000,
			"reportSpecification": {
				"reportName": "housing",
				"geoJSON": {
					"geometry": {
						"coordinates": [-78.86199349999998, 35.9848638],
						"radius": 1600,
						"type": "Point"
					},
					"properties": {
						"address": "204 S Miami Blvd, Durham, NC 27703, USA"
					}
				}
			}
		},
		"reportSpecification": {
			"reportName": "general_demographic",
			"geoJSON": {
				"geometry": {
					"coordinates": [-78.86199349999998, 35.9848638],
					"radius": 1600,
					"type": "Point"
				},
				"properties": {
					"address": "204 S Miami Blvd, Durham, NC 27703, USA"
				}
			}
		}
	},
	"reportSpecification": {
		"reportName": "general_demographic",
		"geoJSON": {
			"geometry": {
				"coordinates": [-78.86199349999998, 35.9848638],
				"radius": 1600,
				"type": "Point"
			},
			"properties": {
				"address": "204 S Miami Blvd, Durham, NC 27703, USA"
			}
		}
	}
}
export interface State {
    data: any,
    reportSpecification: any
};

export const initialState: State = {
  data: tempObject.data,
  reportSpecification: tempObject.reportSpecification
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




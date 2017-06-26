import { Location } from '../models/location';
// import { ReportTypeService } from '../services/report-type.service';
import * as locations from '../actions/locations';

export interface State {
  all: Location[],
};

export const initialState: State = {
  all: []
};

// reducer, think of it as a table in the db
export function reducer(state = initialState, action: locations.Actions ): State {
  switch (action.type) {
    case locations.ActionTypes.SET: {
      const locations:Location[] = action.payload;
      return {all: locations } 
    }

    default: {
      return state;
    }
  }
}

export const getAll = (state: State) => state.all
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
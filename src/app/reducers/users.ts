import { User } from "../models/user";
import * as user from '../actions/user';

export interface State {
  current: User | undefined
};

export const initialState: State = {
  current: undefined
};

// reducer, think of it as a table in the db
export function reducer(state = initialState, action: user.Actions ): State {
  switch (action.type) {
    case user.ActionTypes.LOAD: {
      const user = action.payload;
      return {current: user}
    }
    case user.ActionTypes.SIGNOUT: {
      console.log("SIGNOUT EVENT")
      const user = action.payload;
      return {current: undefined}
    }
    default: {
      return state;
    }
  }
}

export const getCurrent = (state: State) => state.current
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
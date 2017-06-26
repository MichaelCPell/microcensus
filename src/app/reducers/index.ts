import { createSelector } from 'reselect';
import { environment } from '../../environments/environment';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromUsers from './users';
import * as fromReportTypes from './report-types';
import * as fromLocation from './locations';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  user: fromUsers.State;
  reportTypes: fromReportTypes.State;
  location: fromLocation.State;
}

const reducers = {
  user: fromUsers.reducer,
  reportTypes: fromReportTypes.reducer,
  location: fromLocation.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any){
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `user` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
export const getUserState = (state: State) => state.user
export const getReportTypeState = (state: State) => state.reportTypes
export const getLocationState = (state: State) => state.location

// User Selectors
export const getUser = createSelector(getUserState, fromUsers.getCurrent)


// ReportType Selectors
export const getReportTypes = createSelector(getReportTypeState, fromReportTypes.getAll)
export const getActiveReportType = createSelector(getReportTypeState, fromReportTypes.getActive)

// Location Selectors
export const getLocations = createSelector(getLocationState, fromLocation.getAll)
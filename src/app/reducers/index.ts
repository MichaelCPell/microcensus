import { createSelector } from 'reselect';
import { environment } from '../../environments/environment';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromUsers from './users';
import * as fromReportTypes from './report-types';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  user: fromUsers.State;
  reportTypes: fromReportTypes.State;
}

const reducers = {
  user: fromUsers.reducer,
  reportTypes: fromReportTypes.reducer
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
export const getUserState = (state: State) => {
    console.log("GET USER STATE WAS CALLED")
    console.log(state)
    return state.user
};

export const getReportTypeState = (state: State) => {
    console.log("GET RT STATE WAS CALLED")
    console.log(state)
    return state.reportTypes
};

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */
export const getUser = createSelector(getUserState, fromUsers.getCurrent)


export const getReportTypes = createSelector(getReportTypeState, fromReportTypes.getAll)
export const getActiveReportType = createSelector(getReportTypeState, fromReportTypes.getActive)
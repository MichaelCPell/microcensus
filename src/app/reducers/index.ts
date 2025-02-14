import { createSelector } from 'reselect';
import { environment } from '../../environments/environment';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromUsers from './user.reducer';
import * as fromReportTypes from './report-types';
import * as fromReportSpecifications from './report-specifications.reducer';
import * as fromReport from './report.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  user: fromUsers.State;
  reportTypes: fromReportTypes.State;
  reportSpecification: fromReportSpecifications.State;
  report: fromReport.State;
}

const reducers = {
  user: fromUsers.reducer,
  reportTypes: fromReportTypes.reducer,
  reportSpecification: fromReportSpecifications.reducer,
  report: fromReport.reducer
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
export const getReportSpecificationState = (state: State) => state.reportSpecification
export const getReportState = (state: State) => state.report

export const getUserEmail = createSelector(getUserState, fromUsers.getEmail);
export const getUserSub = createSelector(getUserState, fromUsers.getSub);

export const getReportTypes = createSelector(getUserState, fromUsers.getReportTypes)
export const getActiveReportType = createSelector(getReportTypeState, fromReportTypes.getActive)

export const getLocations = createSelector(getUserState, fromUsers.getLocations)

export const getReportSpecification = createSelector(getReportSpecificationState, fromReportSpecifications.get)

export const getReport = createSelector(getReportState, fromReport.get)
export const getReportUrl = createSelector(getReportState, fromReport.getUrl)
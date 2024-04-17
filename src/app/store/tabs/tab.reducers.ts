import { createReducer, on } from '@ngrx/store';
import * as TabActions from './tab.action';
import * as LocationActions from '../location/location.actions';

const initialState: number = 0;

export const tabReducer = createReducer(
    initialState,
    on(TabActions.setActiveTab, (state, action) => {
        return action.index;
    })
);

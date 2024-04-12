import { createReducer, on } from '@ngrx/store';
import { LocationsStateInterface } from 'app/interfaces/locations.interfaces';
import * as LocationActions from './location.actions';

const initialState: LocationsStateInterface = {
    locations: [],
    error: null
};

export const locationReducer = createReducer(
    initialState,
    on(LocationActions.addLocation, (state, { zipcode }) => {
        return {
            ...state,
            locations: [...state.locations, zipcode],
            error: null
        };
    }),
    on(LocationActions.removeLocation, (state, { zipcode }) => {
        const index = state.locations.indexOf(zipcode);
        if (index > -1) {
            return {
                ...state,
                locations: [
                    ...state.locations.slice(0, index),
                    ...state.locations.slice(index + 1)
                ]
            };
        }
        return state;
    }),
    on(LocationActions.addLocationFail, (state, { error }) => {
        return {
            ...state,
            error
        };
    })
);

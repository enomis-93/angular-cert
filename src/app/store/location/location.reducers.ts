import { createReducer, on } from '@ngrx/store';
import { LocationsStateInterface } from 'app/interfaces/locations.interfaces';
import * as LocationActions from './location.actions';
import { LOCATIONS } from 'app/services/location.service';

const initialState: LocationsStateInterface = {
    locations: [],
    error: null
};

export const locationReducer = createReducer(
    initialState,
    on(LocationActions.addLocation, (state, { zipcode }) => {
        localStorage.setItem(
            LOCATIONS,
            JSON.stringify([...state.locations, zipcode])
        );

        return {
            ...state,
            locations: [...state.locations, zipcode],
            error: null
        };
    }),
    on(LocationActions.removeLocation, (state, { zipcode }) => {
        const index = state.locations.indexOf(zipcode);

        if (index > -1) {
            let locations: string[] = [
                ...state.locations.slice(0, index),
                ...state.locations.slice(index + 1)
            ];
            localStorage.setItem(LOCATIONS, JSON.stringify(locations));

            return {
                ...state,
                locations
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

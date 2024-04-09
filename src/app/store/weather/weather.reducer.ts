import { createReducer, on } from '@ngrx/store';
import * as weatherActions from './weather.actions';
import * as locationActions from '../location/location.actions';
import { WeatherState } from 'app/interfaces/weatherState.interface';
import { isValidUSZipCode } from 'app/utils/us-zip-code.validator';

const initialState: WeatherState = {
    currentConditions: null,
    locations: [],
    error: null
};

export const weatherReducer = createReducer(
    initialState,
    on(locationActions.addLocation, (state, { zipcode }) => {
        if (!isValidUSZipCode(zipcode)) {
            return {
                ...state,
                error: 'Invalid US zip code'
            };
        }

        return {
            ...state,
            locations: [...state.locations, zipcode]
        };
    }),
    on(locationActions.removeLocation, (state, { zipcode }) => {
        const index = state.locations.indexOf(zipcode);
        if (index > -1) {
            return {
                ...state,
                locations: [
                    ...state.locations.slice(0, index),
                    ...state.locations.slice(index + 1)
                ],
                currentConditions: state.currentConditions.filter(
                    (cond) => cond.zipcode !== zipcode
                )
            };
        }
        return state;
    }),
    on(weatherActions.loadCurrentConditions, (state) => ({
        ...state,
        error: null
    })),
    on(weatherActions.loadCurrentConditionsSuccess, (state, { data }) => ({
        ...state,
        currentConditions: [...(state.currentConditions || []), ...data]
    })),
    on(weatherActions.loadCurrentConditionsFail, (state, { error }) => ({
        ...state,
        error
    }))
);

export const getCurrentConditions = (state: WeatherState) =>
    state.currentConditions;

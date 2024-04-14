import { createReducer, on } from '@ngrx/store';
import * as weatherActions from './weather.actions';
import * as locationActions from '../location/location.actions';
import { WeatherState } from 'app/interfaces/weatherState.interface';
import { isValidUSZipCode } from 'app/utils/us-zip-code.validator';

const initialState: WeatherState = {
    currentConditions: null,
    error: null
};

export const weatherReducer = createReducer(
    initialState,
    on(weatherActions.loadCurrentConditions, (state) => ({
        ...state,
        error: null
    })),
    on(weatherActions.loadCurrentConditionsSuccess, (state, { data }) => ({
        ...state,
        currentConditions: [...(state.currentConditions || []), ...data],
        error: null
    })),
    on(weatherActions.loadCurrentConditionsFail, (state, { error }) => ({
        ...state,
        error
    })),
    on(locationActions.removeLocation, (state, { zipcode }) => {
        if (!state.error) {
            const filteredCurrentConditions = state.currentConditions.filter(
                (loc) => loc.zipcode !== zipcode
            );

            return {
                ...state,
                currentConditions: filteredCurrentConditions
            };
        }

        return {
            ...state
        };
    })
);

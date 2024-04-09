import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from 'app/interfaces/weatherState.interface';

export const selectWeatherFeature =
    createFeatureSelector<WeatherState>('weather');

export const selectAllCurrentConditions = createSelector(
    selectWeatherFeature,
    (state) =>
        state.currentConditions ? Object.values(state.currentConditions) : [] // Extract values with type checking
);

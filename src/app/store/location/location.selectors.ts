import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationsStateInterface } from 'app/interfaces/locationState.interface';

export const selectLocationsfeature =
    createFeatureSelector<LocationsStateInterface>('locations');

export const isLocationError = createSelector(
    selectLocationsfeature,
    (state) => state.error
);

export const selectAllLocations = createSelector(
    selectLocationsfeature,
    (state) => state.locations
);

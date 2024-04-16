import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTabsfeature =
    createFeatureSelector<number>('activeTabIndex');

export const selectActiveTabIndex = createSelector(
    selectTabsfeature,
    (state) => state
);

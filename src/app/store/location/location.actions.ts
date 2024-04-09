import { createAction, props } from '@ngrx/store';

export const addLocation = createAction(
    '[Location] Add Location',
    props<{ zipcode: string }>()
);

export const removeLocation = createAction(
    '[Location] Remove Location',
    props<{ zipcode: string }>()
);

export const addLocationFail = createAction(
    '[Location] Add Location Fail',
    props<{ error: string }>()
);

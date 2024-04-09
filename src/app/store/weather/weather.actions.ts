import { createAction, props } from '@ngrx/store';
import { ConditionsAndZip } from 'app/interfaces/conditionsAndZip.interface';

export const loadCurrentConditions = createAction(
    '[Weather] Load Current Conditions',
    props<{ zipcode: string }>()
);

export const loadCurrentConditionsSuccess = createAction(
    '[Weather] Load Current Conditions Success',
    props<{ data: ConditionsAndZip[] }>()
);

export const loadCurrentConditionsFail = createAction(
    '[Weather] Load Current Conditions Fail',
    props<{ error: any }>()
);

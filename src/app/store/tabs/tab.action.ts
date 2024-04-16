import { createAction, props } from '@ngrx/store';

export const setActiveTab = createAction(
    '[Tab] Set Active Tab',
    props<{ index: number }>()
);

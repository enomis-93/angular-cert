import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as WeatherActions from '../weather/weather.actions';
import * as TabActions from './tab.action';
import * as LocationActions from '../location/location.actions';
import { selectAllCurrentConditions } from '../weather/weather.selectors';

@Injectable()
export class TabEffects {
    constructor(private actions$: Actions, private store: Store) {}

    updateTabActiveIndex$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                WeatherActions.loadCurrentConditionsSuccess &&
                    LocationActions.addLocation
            ),
            withLatestFrom(this.store.select(selectAllCurrentConditions)),
            map(([action, currentConditions]) =>
                currentConditions.length > 0
                    ? TabActions.setActiveTab({
                          index: currentConditions.length
                      })
                    : TabActions.setActiveTab({
                          index: 0
                      })
            )
        )
    );
}

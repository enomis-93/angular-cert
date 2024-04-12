import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as weatherActions from './weather.actions';
import { Store } from '@ngrx/store';
import { WeatherService } from 'app/services/weather.service';
import * as locationActions from '../location/location.actions';
import { WeatherState } from 'app/interfaces/weatherState.interface';
import { selectAllLocations } from '../location/location.selectors';

@Injectable()
export class WeatherEffects {
    constructor(
        private actions$: Actions,
        private weatherService: WeatherService,
        private store: Store<WeatherState>
    ) {}

    loadCurrentConditions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(locationActions.addLocation), // Listen for location actions
            withLatestFrom(this.store.select(selectAllLocations)),
            map(([action]) => {
                const zipcode = action.zipcode; // Extract zipcode from location action
                return { zipcode };
            }),
            mergeMap(({ zipcode }) =>
                this.weatherService.getCurrentConditions(zipcode).pipe(
                    map((data) =>
                        weatherActions.loadCurrentConditionsSuccess({
                            data: [{ zipcode, data }],
                            locationName: data.name
                        })
                    ),
                    catchError((error) =>
                        of(
                            weatherActions.loadCurrentConditionsFail({
                                error
                            })
                        )
                    )
                )
            )
        )
    );
}

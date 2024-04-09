import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    catchError,
    filter,
    map,
    mergeMap,
    withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as weatherActions from './weather.actions';
import { Store } from '@ngrx/store';
import { CurrentConditions } from 'app/interfaces/current-conditions.type';
import { WeatherService } from 'app/weather.service';
import { selectAllCurrentConditions } from './weather.selectors';
import * as locationActions from '../location/location.actions';
import { ConditionsAndZip } from 'app/interfaces/conditionsAndZip.interface';
import { WeatherState } from 'app/interfaces/weatherState.interface';
import { HttpClient } from '@angular/common/http';

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
            withLatestFrom(this.store.select(selectAllCurrentConditions)),
            map(([action, currentConditions]) => {
                const zipcode = action.zipcode; // Extract zipcode from location action
                return { zipcode, currentConditions };
            }),
            // TODO Avoid filter here, but check for existing zipcode before
            filter(({ currentConditions, zipcode }) => {
                // Filter if zipcode doesn't exist or needs removal
                return !currentConditions?.find(
                    (c: ConditionsAndZip) => c.zipcode === zipcode
                );
            }),
            mergeMap(({ zipcode }) =>
                this.weatherService.getCurrentConditions(zipcode).pipe(
                    map((data) =>
                        weatherActions.loadCurrentConditionsSuccess({
                            data: [{ zipcode, data }]
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

import { Injectable, Signal } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    catchError,
    concatMap,
    map,
    mergeMap,
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as WeatherActions from './weather.actions';
import { Store } from '@ngrx/store';
import { WeatherService } from 'app/services/weather.service';
import * as LocationActions from '../location/location.actions';
import * as TabsActions from '../tabs/tab.action';
import { WeatherState } from 'app/interfaces/weatherState.interface';
import { selectAllLocations } from '../location/location.selectors';
import { selectAllCurrentConditions } from './weather.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { CacheService } from 'app/services/cache.service';

@Injectable()
export class WeatherEffects {
    constructor(
        private actions$: Actions,
        private weatherService: WeatherService,
        private cacheService: CacheService,
        private store: Store<WeatherState>
    ) {}

    loadCurrentConditions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.addLocation),
            mergeMap(({ zipcode }) => {
                return this.weatherService
                    .getCachedWeatherLocationData(zipcode)
                    .pipe(
                        mergeMap((cachedData) => {
                            // Check for cached data
                            if (cachedData) {
                                return of(
                                    WeatherActions.loadCurrentConditionsSuccess(
                                        {
                                            data: [
                                                { zipcode, data: cachedData }
                                            ],
                                            locationName: cachedData.name
                                        }
                                    )
                                );
                            } else {
                                // No cached data, call API to get data
                                return this.weatherService
                                    .getCurrentConditions(zipcode)
                                    .pipe(
                                        map((data) => {
                                            this.weatherService.cacheWeatherLocationData(
                                                zipcode,
                                                data
                                            );
                                            return WeatherActions.loadCurrentConditionsSuccess(
                                                {
                                                    data: [
                                                        {
                                                            zipcode,
                                                            data
                                                        }
                                                    ],
                                                    locationName: data.name
                                                }
                                            );
                                        }),
                                        catchError((error) =>
                                            of(
                                                // Set error in case of API fails
                                                WeatherActions.loadCurrentConditionsFail(
                                                    {
                                                        error
                                                    }
                                                ),
                                                // Set active tab
                                                TabsActions.setActiveTab({
                                                    index: 0
                                                }),
                                                // Remove zipcode from locations if fails
                                                LocationActions.removeLocation({
                                                    zipcode
                                                })
                                            )
                                        )
                                    );
                            }
                        })
                    );
            })
        )
    );

    removeCachedLocation$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LocationActions.removeLocation),
                tap(({ zipcode }) => {
                    this.cacheService.removeCache(zipcode);
                })
            ),
        { dispatch: false } // No need to dispatch any action cause remove cache it's a side effect
    );
}

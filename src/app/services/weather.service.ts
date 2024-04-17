import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CurrentConditions } from '../interfaces/currentConditions.interface';
import { Forecast } from '../interfaces/forecast.Interface';
import { CacheService } from './cache.service';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    static readonly URL = 'https://api.openweathermap.org/data/2.5';
    static readonly APPID = '5a4b2d457ecbef9eb2a71e480b947604';
    static readonly ICON_URL =
        'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';

    constructor(public http: HttpClient, private cacheService: CacheService) {}

    getForecast(zipcode: string): Observable<Forecast> {
        const cachedForecast: Forecast = this.cacheService.getCache(
            `${zipcode}_forecast`
        );

        if (!cachedForecast) {
            return this.http
                .get<Forecast>(
                    `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
                )
                .pipe(
                    map((forecast) => {
                        // Save forecast in cache
                        this.cacheService.setCache<Forecast>(
                            `${zipcode}_forecast`,
                            forecast
                        );
                        return forecast;
                    })
                );
        }

        return of(cachedForecast);
    }

    getCurrentConditions(zipcode: string): Observable<CurrentConditions> {
        return this.http.get<CurrentConditions>(
            `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
        );
    }

    getCachedWeatherLocationData(
        zipcode: string
    ): Observable<CurrentConditions | null> {
        const cachedData =
            this.cacheService.getCache<CurrentConditions>(zipcode);
        if (cachedData) {
            // If data is available in cache, return it
            return of(cachedData);
        } else {
            // Return empty observable
            return of(null);
        }
    }

    // Function to update weather data for a location
    cacheWeatherLocationData(zipcode: string, data: CurrentConditions): void {
        if (!data) {
            return;
        }
        this.cacheService.setCache<CurrentConditions>(zipcode, data);
    }

    getWeatherIcon(id: number): string {
        if (id >= 200 && id <= 232)
            return WeatherService.ICON_URL + 'art_storm.png';
        else if (id >= 501 && id <= 511)
            return WeatherService.ICON_URL + 'art_rain.png';
        else if (id === 500 || (id >= 520 && id <= 531))
            return WeatherService.ICON_URL + 'art_light_rain.png';
        else if (id >= 600 && id <= 622)
            return WeatherService.ICON_URL + 'art_snow.png';
        else if (id >= 801 && id <= 804)
            return WeatherService.ICON_URL + 'art_clouds.png';
        else if (id === 741 || id === 761)
            return WeatherService.ICON_URL + 'art_fog.png';
        else return WeatherService.ICON_URL + 'art_clear.png';
    }
}

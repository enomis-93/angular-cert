import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Forecast } from '../components/forecasts-list/forecast.type';
import { CurrentConditions } from '../interfaces/current-conditions.type';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    static readonly URL = 'http://api.openweathermap.org/data/2.5';
    static readonly APPID = '5a4b2d457ecbef9eb2a71e480b947604';
    static readonly ICON_URL =
        'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';

    constructor(public http: HttpClient) {}

    getForecast(zipcode: string): Observable<Forecast> {
        return this.http.get<Forecast>(
            `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
        );
    }

    getCurrentConditions(zipcode: string): Observable<CurrentConditions> {
        return this.http.get<CurrentConditions>(
            `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
        );
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

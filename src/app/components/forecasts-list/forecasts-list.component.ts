import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'app/services/weather.service';
import { Forecast } from '../../interfaces/forecast.Interface';

@Component({
    selector: 'app-forecasts-list',
    templateUrl: './forecasts-list.component.html',
    styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent implements OnInit {
    forecast: Forecast;
    zipcode: string;
    forecastError = signal('');

    constructor(
        protected weatherService: WeatherService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((params) => {
            this.zipcode = params['zipcode'];
        });
    }

    ngOnInit(): void {
        this.weatherService.getForecast(this.zipcode).subscribe({
            next: (forecast) => {
                this.forecast = forecast;
            },
            error: (error: HttpErrorResponse) => {
                this.forecastError.set(error.statusText);
            }
        });
    }
}

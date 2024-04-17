import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentConditions } from 'app/interfaces/currentConditions.interface';
import { Observable } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { TabData } from 'app/interfaces/tabData.interface';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {
    @Input() locationData: Observable<TabData<CurrentConditions>[]> | [];
    @Input() activeTabIndex: number;

    private weatherService: WeatherService = inject(WeatherService);
    private router: Router = inject(Router);
    protected locationService: LocationService = inject(LocationService);

    constructor() {}

    showForecast(zipcode: string): void {
        this.router.navigate(['/forecast', zipcode]);
    }

    getWeatherIcon(iconID: number): string {
        return this.weatherService.getWeatherIcon(iconID);
    }
}

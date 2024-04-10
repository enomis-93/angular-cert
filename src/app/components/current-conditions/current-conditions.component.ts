import { Component, inject, OnInit, Signal } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { ConditionsAndZip } from 'app/interfaces/conditionsAndZip.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllCurrentConditions } from 'app/store/weather/weather.selectors';
import { WeatherState } from 'app/interfaces/weatherState.interface';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {
    private weatherService = inject(WeatherService);
    private router = inject(Router);
    protected locationService = inject(LocationService);

    currentConditions$: Observable<ConditionsAndZip[] | null>;

    constructor(private store: Store<WeatherState>) {}

    ngOnInit(): void {
        this.currentConditions$ = this.store.pipe(
            select(selectAllCurrentConditions)
        );
    }

    // protected currentConditionsByZip: Signal<ConditionsAndZip[]> =
    //     this.weatherService.getCurrentConditions();

    showForecast(zipcode: string) {
        this.router.navigate(['/forecast', zipcode]);
    }
}

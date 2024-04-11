import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ConditionsAndZip } from 'app/interfaces/conditionsAndZip.interface';
import { CurrentConditions } from 'app/interfaces/current-conditions.type';
import { TabInterface } from 'app/interfaces/tabs.interfaces';
import { WeatherState } from 'app/interfaces/weatherState.interface';
import { LocationService } from 'app/services/location.service';
import { TabCloseEvent } from 'app/shared/components/tabs/tabs.component';
import { selectAllCurrentConditions } from 'app/store/weather/weather.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
    tabs$: Observable<TabInterface<CurrentConditions>[]>;

    activeTabIndex = 0;

    constructor(
        private store: Store<WeatherState>,
        private locationService: LocationService
    ) {}

    ngOnInit(): void {
        this.tabs$ = this.store.pipe(
            select(selectAllCurrentConditions),
            map((locations: ConditionsAndZip[]) =>
                locations.map((location) => ({
                    title: `${location.data.name} (${location.zipcode})`,
                    content: { ...location.data, zipcode: location.zipcode }
                }))
            )
        );
    }

    onTabChange(index: number) {
        this.activeTabIndex = index;
    }

    onCloseTab(event: TabCloseEvent<CurrentConditions>) {
        const locationToRemove: TabInterface<CurrentConditions> =
            event.data[event.index];
        this.locationService.removeLocation(locationToRemove.content.zipcode);
    }
}

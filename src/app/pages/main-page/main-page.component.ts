import { Component, OnInit, Signal, signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ConditionsAndZip } from 'app/interfaces/conditionsAndZip.interface';
import { CurrentConditions } from 'app/interfaces/current-conditions.type';
import { TabInterface } from 'app/interfaces/tabs.interfaces';
import { WeatherState } from 'app/interfaces/weatherState.interface';
import { LocationService } from 'app/services/location.service';
import { TabCloseEvent } from 'app/shared/components/tabs/tabs.component';
import { selectActiveTabIndex } from 'app/store/tabs/tab.selectors';
import { selectAllCurrentConditions } from 'app/store/weather/weather.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { setActiveTab } from 'app/store/tabs/tab.action';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
    tabs$: Observable<TabInterface<CurrentConditions>[]>;

    activeTabIndex$: Observable<number | null> = this.store.pipe(
        select(selectActiveTabIndex)
    );

    currentConditions$: Signal<ConditionsAndZip[]> = toSignal(
        this.store.pipe(select(selectAllCurrentConditions))
    );

    activeTabIndexSignal$: Signal<number | null> = toSignal(
        this.activeTabIndex$
    );

    constructor(
        private store: Store,
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
        this.store.dispatch(setActiveTab({ index }));
    }

    onCloseTab(event: TabCloseEvent<CurrentConditions>) {
        const locationToRemove: TabInterface<CurrentConditions> =
            event.data[event.index];

        // Dispatch action to remove the location
        this.locationService.removeLocation(locationToRemove.content.zipcode);

        this.setActiveIndex(event);
    }

    setActiveIndex(event: TabCloseEvent<CurrentConditions>) {
        // Set the the active tab index to currentConditions Array lenght minus one, cause removing a tab
        if (event.index != this.activeTabIndexSignal$()) {
            this.store.dispatch(
                setActiveTab({
                    index: this.currentConditions$().length - 1
                })
            );
            return;
        }

        //  If tab to close index is equal to active tab index set first tab as active
        this.store.dispatch(setActiveTab({ index: 0 }));
    }
}

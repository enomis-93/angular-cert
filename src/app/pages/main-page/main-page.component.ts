import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { ConditionsAndZip } from 'app/interfaces/conditionsAndZip.interface';
import { CurrentConditions } from 'app/interfaces/currentConditions.interface';
import { TabCloseEvent } from 'app/interfaces/tabCloseEvent.interface';
import { TabData } from 'app/interfaces/tabData.interface';
import { LocationService } from 'app/services/location.service';
import { setActiveTab } from 'app/store/tabs/tab.action';
import { selectActiveTabIndex } from 'app/store/tabs/tab.selectors';
import { selectAllCurrentConditions } from 'app/store/weather/weather.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
    tabs$: Observable<TabData<CurrentConditions>[]>;
    activeTabIndex: Signal<number | null>;
    currentConditions: Signal<ConditionsAndZip[]>;

    constructor(
        private store: Store,
        private locationService: LocationService
    ) {
        this.activeTabIndex = toSignal(
            this.store.pipe(select(selectActiveTabIndex))
        );

        this.currentConditions = toSignal(
            this.store.pipe(select(selectAllCurrentConditions))
        );
    }

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

    onTabChange(index: number): void {
        this.store.dispatch(setActiveTab({ index }));
    }

    onCloseTab(event: TabCloseEvent<CurrentConditions>): void {
        const locationToRemove: TabData<CurrentConditions> =
            event.data[event.index];

        // Dispatch action to remove the location
        this.locationService.removeLocation(locationToRemove.content.zipcode);

        this.setActiveIndex(event.previousIndex);
    }

    setActiveIndex(previousIndex: number): void {
        this.store.dispatch(
            setActiveTab({
                index:
                    this.currentConditions().length > 0 ? previousIndex - 1 : 0
            })
        );
    }
}

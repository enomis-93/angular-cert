import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LocationsStateInterface } from './interfaces/locations.interfaces';
import { addLocation, removeLocation } from './store/location/location.actions';
import { Observable } from 'rxjs';
import { selectAllLocations } from './store/weather/weather.selector';
import { toSignal } from '@angular/core/rxjs-interop';

export const LOCATIONS: string = 'locations';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    locations$: Observable<string[]> = this.store.pipe(
        select(selectAllLocations)
    );

    locations = toSignal(this.locations$);

    constructor(private store: Store<{ locations: LocationsStateInterface }>) {
        let storedLocations = localStorage.getItem(LOCATIONS);
        if (storedLocations) {
            for (let loc of JSON.parse(storedLocations)) {
                this.store.dispatch(addLocation({ zipcode: loc }));
            }
        }
    }

    addLocation(zipcode: string) {
        this.store.dispatch(addLocation({ zipcode }));
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations()));
    }

    removeLocation(zipcode: string) {
        this.store.dispatch(removeLocation({ zipcode }));
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations()));
    }
}

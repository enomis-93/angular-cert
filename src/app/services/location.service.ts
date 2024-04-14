import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LocationsStateInterface } from '../interfaces/locationState.interface';
import {
    addLocation,
    addLocationFail,
    removeLocation
} from '../store/location/location.actions';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { isValidUSZipCode } from '../utils/us-zip-code.validator';
import { selectAllLocations } from '../store/location/location.selectors';

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
        // Validate Zip Code
        if (!isValidUSZipCode(zipcode)) {
            this.store.dispatch(
                addLocationFail({ error: 'Invalid US Zip Code' })
            );
            return;
        }
        // Check if zipcode already exist
        if (this.locations().includes(zipcode)) {
            this.store.dispatch(
                addLocationFail({ error: 'Zip Code Already Exist!' })
            );
            return;
        }

        this.store.dispatch(addLocation({ zipcode }));
    }

    removeLocation(zipcode: string) {
        this.store.dispatch(removeLocation({ zipcode }));
    }
}

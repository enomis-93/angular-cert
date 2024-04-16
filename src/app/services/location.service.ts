import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AlertType } from 'app/enums/alertType.enum';
import { hasLoadCurrentConditionsFail } from 'app/store/weather/weather.selectors';
import { LocationsStateInterface } from '../interfaces/locationState.interface';
import {
    addLocation,
    addLocationFail,
    removeLocation
} from '../store/location/location.actions';
import {
    isLocationError,
    selectAllLocations
} from '../store/location/location.selectors';
import { isValidUSZipCode } from '../utils/us-zip-code.validator';
import { AlertService } from './alert.service';

export const LOCATIONS: string = 'locations';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    locations: Signal<string[]> = toSignal(
        this.store.pipe(select(selectAllLocations))
    );

    locationError: Signal<string> = toSignal(
        this.store.pipe(select(isLocationError))
    );

    loadWeatherError: Signal<string> = toSignal(
        this.store.pipe(select(hasLoadCurrentConditionsFail))
    );

    constructor(
        private store: Store<{ locations: LocationsStateInterface }>,
        private alertService: AlertService
    ) {
        let storedLocations = localStorage.getItem(LOCATIONS);
        if (storedLocations) {
            for (let loc of JSON.parse(storedLocations)) {
                this.store.dispatch(addLocation({ zipcode: loc }));
            }
        }
    }

    addLocation(zipcode: string): void {
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
                addLocationFail({
                    error: `Zip Code ${zipcode} Already Exist !`
                })
            );
            // Show alert message
            this.alertService.addAlert(this.locationError(), AlertType.DANGER);
            return;
        }

        this.store.dispatch(addLocation({ zipcode }));

        // Workaround, cause the weather error is async
        setTimeout(() => {
            if (!this.loadWeatherError()) {
                this.alertService.addAlert(
                    `Zip Code ${zipcode} inserted successfully !`,
                    AlertType.SUCCESS
                );
            }
        }, 500);
    }

    removeLocation(zipcode: string): void {
        this.store.dispatch(removeLocation({ zipcode }));

        this.alertService.addAlert(
            `ZipCode ${zipcode} removed successfully !`,
            AlertType.SUCCESS
        );
    }
}

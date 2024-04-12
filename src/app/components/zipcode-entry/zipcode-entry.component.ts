import { Component } from '@angular/core';
import { LocationsStateInterface } from 'app/interfaces/locations.interfaces';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLocationError } from 'app/store/location/location.selectors';
import { LocationService } from 'app/services/location.service';
import { hasLoadCurrentConditionsFail } from 'app/store/weather/weather.selectors';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {
    isLocationError$: Observable<string>;
    hasLoadCurrentConditionError$: Observable<string>;

    constructor(
        private locationService: LocationService,
        private store: Store<LocationsStateInterface>
    ) {
        this.isLocationError$ = this.store.pipe(select(isLocationError));
        this.hasLoadCurrentConditionError$ = this.store.pipe(
            select(hasLoadCurrentConditionsFail)
        );
    }

    addLocation(zipcode: string) {
        this.locationService.addLocation(zipcode);
    }
}

import { Component } from '@angular/core';
import { LocationsStateInterface } from 'app/interfaces/locations.interfaces';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLocationError } from 'app/store/location/location.selectors';
import { LocationService } from 'app/services/location.service';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {
    isError$: Observable<string>;

    constructor(
        private locationService: LocationService,
        private store: Store<LocationsStateInterface>
    ) {
        this.isError$ = this.store.pipe(select(isLocationError));
    }

    addLocation(zipcode: string) {
        this.locationService.addLocation(zipcode);
    }
}
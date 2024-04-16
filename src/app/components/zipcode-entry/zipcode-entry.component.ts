import { Component, ElementRef, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { Alert } from 'app/interfaces/alert.interface';
import { LocationsStateInterface } from 'app/interfaces/locationState.interface';
import { AlertService } from 'app/services/alert.service';
import { LocationService } from 'app/services/location.service';
import { addLocationFail } from 'app/store/location/location.actions';
import { isLocationError } from 'app/store/location/location.selectors';
import { loadCurrentConditionsFail } from 'app/store/weather/weather.actions';
import { hasLoadCurrentConditionsFail } from 'app/store/weather/weather.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {
    @ViewChild('zipcode') zipCodeInput: ElementRef;

    alerts$: Observable<Alert[]>;
    isLocationError$: Signal<string> = toSignal(
        this.store.pipe(select(isLocationError))
    );
    hasLoadCurrentConditionError$: Signal<string> = toSignal(
        this.store.pipe(select(hasLoadCurrentConditionsFail))
    );

    constructor(
        private locationService: LocationService,
        private alertService: AlertService,
        private store: Store<LocationsStateInterface>
    ) {
        this.alerts$ = this.alertService.alerts$;
    }

    addLocation(): void {
        const zipCodeValue = this.zipCodeInput.nativeElement.value;
        this.locationService.addLocation(zipCodeValue);
    }

    onEnterKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.addLocation();
        }
    }

    handleAlertClose(alert: Alert): void {
        this.alertService.removeAlert(alert);
    }
}

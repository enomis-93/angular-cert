import { Injectable } from '@angular/core';
import { AlertType } from 'app/enums/alertType.enum';
import { Alert } from 'app/interfaces/alert.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private alertsSubject = new BehaviorSubject<Alert[]>([]);
    alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

    addAlert(message: string, type?: AlertType, expiry?: number): void {
        const newAlert: Alert = { message, type, expiry };
        this.alertsSubject.next([...this.alertsSubject.getValue(), newAlert]);

        setTimeout(() => this.removeAlert(newAlert), expiry || 3000); //Default expiry time 3 seconds
    }

    removeAlert(alert: Alert): void {
        const alerts = this.alertsSubject.getValue();
        const index = alerts.findIndex((a) => a === alert);
        if (index > -1) {
            alerts.splice(index, 1);
            this.alertsSubject.next(alerts);
        }
    }

    clearAlerts(): void {
        this.alertsSubject.next([]);
    }
}

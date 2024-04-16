import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: []
})
export class AlertComponent implements OnInit {
    @Input() message: string;
    @Input() alertType: 'danger' | 'warning' | 'success' | 'primary' =
        'primary';
    @Output() closeAlert: EventEmitter<void> = new EventEmitter<void>();

    protected alertClass: string = '';

    constructor() {}

    ngOnInit() {
        this.buildAlertClass();
    }

    private buildAlertClass(): void {
        let baseClass = 'alert ';
        switch (this.alertType) {
            case 'danger':
                baseClass += ' alert-danger';
                break;
            case 'warning':
                baseClass += ' alert-warning';
                break;
            case 'success':
                baseClass += ' alert-success';
                break;
            case 'primary':
                baseClass += ' alert-primary';
                break;
            default:
        }
        this.alertClass = baseClass;
    }

    emitCloseEvent(): void {
        this.closeAlert.emit();
    }
}

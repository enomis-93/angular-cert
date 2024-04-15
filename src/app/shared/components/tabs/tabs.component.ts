import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';

export interface TabCloseEvent<T> {
    index: number;
    data: T;
}

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
    @Input({ required: true }) data: { title: string; content: any }[] = [];
    @Input() activeTabIndex: number = 0;
    @Output() tabChange = new EventEmitter<number>();
    @Output() onCloseTab = new EventEmitter<TabCloseEvent<any>>();

    @ContentChild('tabContent') tabContent: ElementRef;

    trackByIndex(index: number) {
        return index;
    }

    selectTab(index: number, event?: Event) {
        this.tabChange.emit(index);
    }

    closeTab<T>(index: number, data: T) {
        this.onCloseTab.emit({ index, data });
    }
}

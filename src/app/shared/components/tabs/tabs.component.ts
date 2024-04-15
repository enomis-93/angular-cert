import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

export interface TabCloseEvent<T> {
    index: number;
    data: T;
}

interface TabData<T> {
    title: string;
    content: T;
}

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
    @Input({ required: true }) data: TabData<any>[] = [];
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

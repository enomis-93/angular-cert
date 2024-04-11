import {
    AfterContentChecked,
    AfterViewChecked,
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

export interface TabCloseEvent<T> {
    index: number;
    data: T;
}

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
    @Input({ required: true }) data: { title: string; content: any }[] = [];
    @Output() tabChange = new EventEmitter<number>();
    @Output() onCloseTab = new EventEmitter<TabCloseEvent<any>>();

    @ContentChild('tabContent') tabContent: ElementRef;

    selectedTabIndex = 0;

    selectTab(index: number) {
        this.selectedTabIndex = index;
        this.tabChange.emit(index);
    }

    closeTab<T>(index: number, data: T) {
        this.selectedTabIndex = index;
        this.onCloseTab.emit({ index, data });
    }
}

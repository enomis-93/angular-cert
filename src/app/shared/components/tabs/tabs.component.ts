import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { TabCloseEvent } from 'app/interfaces/tabCloseEvent.interface';
import { TabContent } from 'app/interfaces/tabContent.interface';
import { TabData } from 'app/interfaces/tabData.interface';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
    @Input({ required: true }) data: TabData<TabContent>[] = [];
    @Input() activeTabIndex: number = 0;
    @Output() tabChange = new EventEmitter<number>();
    @Output() onCloseTab = new EventEmitter<TabCloseEvent<any>>();

    @ContentChild('tabContent') tabContent: ElementRef;

    trackByIndex(index: number): number {
        return index;
    }

    selectTab(index: number, event?: Event): void {
        this.tabChange.emit(index);
    }

    closeTab<T>(index: number, data: T): void {
        const previousIndex = this.activeTabIndex;
        this.onCloseTab.emit({ index, previousIndex, data });
    }
}

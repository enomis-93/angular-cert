import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    WritableSignal,
    signal
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
    @Output() tabChange = new EventEmitter<number>();
    @Output() onCloseTab = new EventEmitter<TabCloseEvent<TabContent>>();

    @ContentChild('tabContent') tabContent: ElementRef;

    activeTabIndex: WritableSignal<number> = signal(0);

    trackByIndex(index: number): number {
        return index;
    }

    selectTab(index: number, event?: Event): void {
        this.activeTabIndex.set(index);
        this.tabChange.emit(index);
    }

    closeTab(index: number, data: TabContent): void {
        const previousIndex = this.activeTabIndex();
        this.onCloseTab.emit({ index, previousIndex, data });
    }
}

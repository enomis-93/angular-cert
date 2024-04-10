import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
    @Input() data: { title: string; content: any }[] = [];
    @Output() tabChange = new EventEmitter<number>();

    @ContentChild('tab-content') tabContentTemplate: any;

    selectedTabIndex = 0;

    selectTab(index: number) {
        this.selectedTabIndex = index;
        this.tabChange.emit(index);
    }
}

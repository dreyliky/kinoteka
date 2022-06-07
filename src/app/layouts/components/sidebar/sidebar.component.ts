import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AppRouteEnum } from '@core/enums';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    @Output()
    public optionClick = new EventEmitter<Event>();

    public readonly appRouteEnum = AppRouteEnum;
}

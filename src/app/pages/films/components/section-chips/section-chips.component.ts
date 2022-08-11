import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FilmsRoutingEnum } from '../../enums';

@Component({
    selector: 'app-section-chips',
    templateUrl: './section-chips.component.html',
    styleUrls: ['./section-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionChipsComponent {
    public readonly filmsRoutingEnum = FilmsRoutingEnum;
    public readonly isMobile = this.deviceService.isMobile();

    constructor(
        private readonly deviceService: DeviceDetectorService
    ) {}
}

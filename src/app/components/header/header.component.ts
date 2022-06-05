import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map, Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    @Output()
    public menuButtonClick = new EventEmitter<Event>();

    public readonly isAppNameVisible$: Observable<boolean> = this.headerService.portalComponent$
        .pipe(
            map((component) => (!component || this.deviceService.isDesktop()))
        );

    public portalComponent$!: Observable<ComponentPortal<unknown> | null>;

    constructor(
        private readonly headerService: HeaderService,
        private readonly deviceService: DeviceDetectorService
    ) {}

    public ngOnInit(): void {
        this.portalComponent$ = this.headerService.portalComponent$;
    }
}

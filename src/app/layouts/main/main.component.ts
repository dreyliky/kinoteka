import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContent, MatDrawerMode } from '@angular/material/sidenav';
import { ContentZoneService } from '@core/services';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
    @ViewChild(MatDrawerContent, { read: ElementRef, static: true })
    private readonly drawerContent!: ElementRef<HTMLElement>;

    @ViewChild(MatDrawer)
    private readonly drawer!: MatDrawer;

    public isDrawerOpened!: boolean;
    public isDrawerHasBackdrop!: boolean;
    public drawerMode!: MatDrawerMode;

    constructor(
        private readonly deviceService: DeviceDetectorService,
        private readonly contentZoneService: ContentZoneService
    ) {}

    public ngOnInit(): void {
        this.initDrawerParameters();
    }

    public ngAfterViewInit(): void {
        this.contentZoneService._registerElement(this.drawerContent.nativeElement);
    }

    public onDrawerOptionClick(): void {
        if (this.deviceService.isMobile()) {
            this.drawer.close();
        }
    }

    private initDrawerParameters(): void {
        const isMobile = this.deviceService.isMobile();
        this.isDrawerOpened = !isMobile;
        this.isDrawerHasBackdrop = isMobile;
        this.drawerMode = (isMobile) ? 'over' : 'side';
    }
}

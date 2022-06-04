import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContent, MatDrawerMode } from '@angular/material/sidenav';
import { ContentZoneService } from '@services';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
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

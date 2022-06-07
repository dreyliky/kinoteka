import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@layouts';
import { HeaderPortalContentComponent } from './header-portal-content';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadsComponent implements OnInit, OnDestroy {
    constructor(
        private readonly headerService: HeaderService
    ) {}

    public ngOnInit(): void {
        this.headerService.setPortalComponent(HeaderPortalContentComponent);
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
    }
}

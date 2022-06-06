import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadsComponent {}

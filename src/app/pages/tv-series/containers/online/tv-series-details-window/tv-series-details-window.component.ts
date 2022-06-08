import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TvSeries } from '@features/tv-series';

@Component({
    selector: 'app-tv-series-details-window',
    templateUrl: './tv-series-details-window.component.html',
    styleUrls: ['./tv-series-details-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeriesDetailsWindowComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: TvSeries,
        private readonly dialog: MatDialogRef<TvSeries>,
    ) {}

    public onCloseButtonClick(): void {
        this.dialog.close();
    }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TvSeries } from '../../interfaces';

@Component({
    selector: 'tv-series-card',
    templateUrl: './tv-series-card.component.html',
    styleUrls: ['./tv-series-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeriesCardComponent {
    @Input()
    public data!: TvSeries;

    public get previewCssUrl(): string {
        return `url(${this.data.previewUrl})`;
    }
}

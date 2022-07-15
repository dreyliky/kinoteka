import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookmarkEnum } from '@features/bookmark';
import { TvSeries } from '@features/tv-series';

@Component({
    selector: 'app-tv-series-card',
    templateUrl: './tv-series-card.component.html',
    styleUrls: ['./tv-series-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeriesCardComponent {
    @Input()
    public tvSeries!: TvSeries;

    @Input()
    public bookmarks!: BookmarkEnum[];
}

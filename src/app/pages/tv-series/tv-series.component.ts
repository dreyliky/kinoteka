import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { BookmarkedTvSeriesesService } from '@features/tv-series';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-tv-series',
    templateUrl: './tv-series.component.html',
    styleUrls: ['./tv-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class TvSeriesComponent implements OnInit {
    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly bookmarkedTvSeriesesService: BookmarkedTvSeriesesService
    ) {}

    public ngOnInit(): void {
        this.updateBookmarkedFilmsDictionaryIfAbsent();
    }

    private updateBookmarkedFilmsDictionaryIfAbsent(): void {
        this.bookmarkedTvSeriesesService.updateDictionaryIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }
}

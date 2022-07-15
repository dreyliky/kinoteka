import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { DestroyService } from '@core/services';
import { Bookmark, BookmarkEnum } from '@features/bookmark';
import { BookmarkedTvSeriesesService, TvSeries } from '@features/tv-series';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-bookmark-button',
    templateUrl: './bookmark-button.component.html',
    styleUrls: ['./bookmark-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class BookmarkButtonComponent implements OnInit {
    @Input()
    public tvSeries!: TvSeries;

    public bookmarks$!: Observable<BookmarkEnum[]>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly bookmarkedTvSeriesesService: BookmarkedTvSeriesesService
    ) {}

    public ngOnInit(): void {
        this.initBookmarksObservable();
        this.updateBookmarkedFilmsDictionaryIfAbsent();
    }

    public onBookmarkSelected(bookmark: Bookmark): void {
        this.bookmarkedTvSeriesesService.add(this.tvSeries.kinopoiskId, bookmark.type)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    public onBookmarkDeselected(bookmark: Bookmark): void {
        this.bookmarkedTvSeriesesService.remove(this.tvSeries.kinopoiskId, bookmark.type)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private updateBookmarkedFilmsDictionaryIfAbsent(): void {
        this.bookmarkedTvSeriesesService.updateDictionaryIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initBookmarksObservable(): void {
        this.bookmarks$ = this.bookmarkedTvSeriesesService.data$
            .pipe(
                filter((data): data is BookmarkedMediaDictionary => !!data),
                map((dictionary) => (dictionary[this.tvSeries.kinopoiskId] ?? []))
            );
    }
}

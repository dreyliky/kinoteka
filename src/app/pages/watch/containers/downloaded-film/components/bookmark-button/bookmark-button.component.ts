import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { DestroyService } from '@core/services';
import { Bookmark, BookmarkEnum } from '@features/bookmark';
import { BookmarkedFilmsService, DownloadedFilm } from '@features/film';
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
    public film!: DownloadedFilm;

    public bookmarks$!: Observable<BookmarkEnum[]>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly bookmarkedFilmsService: BookmarkedFilmsService
    ) {}

    public ngOnInit(): void {
        this.initBookmarksObservable();
        this.updateBookmarkedFilmsDictionaryIfAbsent();
    }

    public onBookmarkSelected(bookmark: Bookmark): void {
        this.bookmarkedFilmsService.add(this.film.kinopoiskId, bookmark.type)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    public onBookmarkDeselected(bookmark: Bookmark): void {
        this.bookmarkedFilmsService.remove(this.film.kinopoiskId, bookmark.type)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private updateBookmarkedFilmsDictionaryIfAbsent(): void {
        this.bookmarkedFilmsService.updateDictionaryIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initBookmarksObservable(): void {
        this.bookmarks$ = this.bookmarkedFilmsService.data$
            .pipe(
                filter((data): data is BookmarkedMediaDictionary => !!data),
                map((dictionary) => (dictionary[this.film.kinopoiskId] ?? []))
            );
    }
}

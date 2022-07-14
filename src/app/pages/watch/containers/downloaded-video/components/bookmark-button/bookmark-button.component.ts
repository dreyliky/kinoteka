import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { DestroyService } from '@core/services';
import { Bookmark, BookmarkEnum } from '@features/bookmark';
import { BookmarkedVideosService, DownloadedVideo } from '@features/video';
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
    public video!: DownloadedVideo;

    public bookmarks$!: Observable<BookmarkEnum[]>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly bookmarkedVideosService: BookmarkedVideosService
    ) {}

    public ngOnInit(): void {
        this.initBookmarksObservable();
        this.updateBookmarkedFilmsDictionaryIfAbsent();
    }

    public onBookmarkSelected(bookmark: Bookmark): void {
        this.bookmarkedVideosService.add(this.video.id, bookmark.type)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    public onBookmarkDeselected(bookmark: Bookmark): void {
        this.bookmarkedVideosService.remove(this.video.id, bookmark.type)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private updateBookmarkedFilmsDictionaryIfAbsent(): void {
        this.bookmarkedVideosService.updateDictionaryIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initBookmarksObservable(): void {
        this.bookmarks$ = this.bookmarkedVideosService.data$
            .pipe(
                filter((data): data is BookmarkedMediaDictionary => !!data),
                map((dictionary) => (dictionary[this.video.id] ?? []))
            );
    }
}

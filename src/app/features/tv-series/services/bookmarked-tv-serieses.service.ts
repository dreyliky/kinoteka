import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { Observable, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedTvSeriesesApi } from '../api';
import { BookmarkedTvSeriesesState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedTvSeriesesService {
    public readonly data$ = this.bookmarkedTvSeriesesState.data$;

    public get data(): BookmarkedMediaDictionary | null {
        return this.bookmarkedTvSeriesesState.data;
    }

    constructor(
        private readonly bookmarkedTvSeriesesApi: BookmarkedTvSeriesesApi,
        private readonly bookmarkedTvSeriesesState: BookmarkedTvSeriesesState
    ) {}

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.bookmarkedTvSeriesesApi.getAsDictionary()
            .pipe(
                tap((data) => this.bookmarkedTvSeriesesState.set(data))
            );
    }

    public updateDictionaryIfAbsent(): Observable<BookmarkedMediaDictionary> {
        if (!this.bookmarkedTvSeriesesState.data) {
            return this.updateDictionary();
        }

        return this.data$ as Observable<BookmarkedMediaDictionary>;
    }

    public add(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.bookmarkedTvSeriesesApi.add(videoId, bookmarkId)
            .pipe(
                tap(() => this.bookmarkedTvSeriesesState.add(videoId, bookmarkId))
            );
    }

    public remove(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.bookmarkedTvSeriesesApi.remove(videoId, bookmarkId)
            .pipe(
                tap(() => this.bookmarkedTvSeriesesState.remove(videoId, bookmarkId))
            );
    }
}

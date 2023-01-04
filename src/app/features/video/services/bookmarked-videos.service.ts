import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { Observable, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedVideosApi } from '../api';
import { BookmarkedVideosState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedVideosService {
    public readonly data$ = this.bookmarkedVideosState.data$;

    public get data(): BookmarkedMediaDictionary | null {
        return this.bookmarkedVideosState.data;
    }

    constructor(
        private readonly bookmarkedVideosApi: BookmarkedVideosApi,
        private readonly bookmarkedVideosState: BookmarkedVideosState
    ) {}

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.bookmarkedVideosApi.getAsDictionary()
            .pipe(
                tap((data) => this.bookmarkedVideosState.set(data))
            );
    }

    public updateDictionaryIfAbsent(): Observable<BookmarkedMediaDictionary> {
        if (!this.bookmarkedVideosState.data) {
            return this.updateDictionary();
        }

        return this.data$ as Observable<BookmarkedMediaDictionary>;
    }

    public add(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.bookmarkedVideosApi.add(videoId, bookmarkId)
            .pipe(
                tap(() => this.bookmarkedVideosState.add(videoId, bookmarkId))
            );
    }

    public remove(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.bookmarkedVideosApi.remove(videoId, bookmarkId)
            .pipe(
                tap(() => this.bookmarkedVideosState.remove(videoId, bookmarkId))
            );
    }
}

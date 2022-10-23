import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { Observable, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedFilmsApi } from '../api';
import { BookmarkedFilmsState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsService {
    public readonly data$ = this.bookmarkedFilmsState.data$;
    public readonly data = this.bookmarkedFilmsState.data;

    constructor(
        private readonly bookmarkedFilmsApi: BookmarkedFilmsApi,
        private readonly bookmarkedFilmsState: BookmarkedFilmsState
    ) {}

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.bookmarkedFilmsApi.getAsDictionary()
            .pipe(
                tap((data) => this.bookmarkedFilmsState.set(data))
            );
    }

    public updateDictionaryIfAbsent(): Observable<BookmarkedMediaDictionary> {
        if (!this.bookmarkedFilmsState.data) {
            return this.updateDictionary();
        }

        return this.data$ as Observable<BookmarkedMediaDictionary>;
    }

    public add(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.bookmarkedFilmsApi.add(kinopoiskId, bookmarkId)
            .pipe(
                tap(() => this.bookmarkedFilmsState.add(kinopoiskId, bookmarkId))
            );
    }

    public remove(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.bookmarkedFilmsApi.remove(kinopoiskId, bookmarkId)
            .pipe(
                tap(() => this.bookmarkedFilmsState.remove(kinopoiskId, bookmarkId))
            );
    }
}

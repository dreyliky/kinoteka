import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { ApiService } from '@core/services';
import { Observable, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedFilmsState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsService {
    public get data(): BookmarkedMediaDictionary | null {
        return this.bookmarkedFilmsState.data;
    }

    public get data$(): Observable<BookmarkedMediaDictionary | null> {
        return this.bookmarkedFilmsState.data$;
    }

    constructor(
        private readonly apiService: ApiService,
        private readonly bookmarkedFilmsState: BookmarkedFilmsState
    ) {}

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.apiService.get<BookmarkedMediaDictionary>(`/bookmarked-films/dictionary`)
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
        return this.apiService.post(`/bookmarked-films/${kinopoiskId}`, { data: bookmarkId })
            .pipe(
                tap(() => this.bookmarkedFilmsState.add(kinopoiskId, bookmarkId))
            );
    }

    public remove(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.apiService.delete(`/bookmarked-films/${kinopoiskId}/${bookmarkId}`)
            .pipe(
                tap(() => this.bookmarkedFilmsState.remove(kinopoiskId, bookmarkId))
            );
    }
}

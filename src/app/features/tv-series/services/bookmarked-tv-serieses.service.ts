import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { ApiService } from '@core/services';
import { Observable, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedTvSeriesesState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedTvSeriesesService {
    public get data(): BookmarkedMediaDictionary | null {
        return this.bookmarkedTvSeriesesState.data;
    }

    public get data$(): Observable<BookmarkedMediaDictionary | null> {
        return this.bookmarkedTvSeriesesState.data$;
    }

    constructor(
        private readonly apiService: ApiService,
        private readonly bookmarkedTvSeriesesState: BookmarkedTvSeriesesState
    ) {}

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.apiService.get<BookmarkedMediaDictionary>(`/bookmarked-tv-serieses/dictionary`)
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
        return this.apiService.post(`/bookmarked-tv-serieses/${videoId}`, { data: bookmarkId })
            .pipe(
                tap(() => this.bookmarkedTvSeriesesState.add(videoId, bookmarkId))
            );
    }

    public remove(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.apiService.delete(`/bookmarked-tv-serieses/${videoId}/${bookmarkId}`)
            .pipe(
                tap(() => this.bookmarkedTvSeriesesState.remove(videoId, bookmarkId))
            );
    }
}

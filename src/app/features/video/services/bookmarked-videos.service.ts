import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { ApiService } from '@core/services';
import { Observable, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedVideosState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedVideosService {
    public get data(): BookmarkedMediaDictionary | null {
        return this.bookmarkedVideosState.data;
    }

    public get data$(): Observable<BookmarkedMediaDictionary | null> {
        return this.bookmarkedVideosState.data$;
    }

    constructor(
        private readonly apiService: ApiService,
        private readonly bookmarkedVideosState: BookmarkedVideosState
    ) {}

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.apiService.get<BookmarkedMediaDictionary>(`/bookmarked-videos/dictionary`)
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
        return this.apiService.post(`/bookmarked-videos/${videoId}`, { data: bookmarkId })
            .pipe(
                tap(() => this.bookmarkedVideosState.add(videoId, bookmarkId))
            );
    }

    public remove(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.apiService.delete(`/bookmarked-videos/${videoId}/${bookmarkId}`)
            .pipe(
                tap(() => this.bookmarkedVideosState.remove(videoId, bookmarkId))
            );
    }
}

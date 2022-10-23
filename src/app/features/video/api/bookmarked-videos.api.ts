import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedVideosApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAsDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.apiService.get<BookmarkedMediaDictionary>(`/bookmarked-videos/dictionary`);
    }

    public add(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.apiService.post(`/bookmarked-videos/${videoId}`, { data: bookmarkId });
    }

    public remove(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.apiService.delete(`/bookmarked-videos/${videoId}/${bookmarkId}`);
    }
}

import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAsDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.apiService.get<BookmarkedMediaDictionary>(`/bookmarked-films/dictionary`);
    }

    public add(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.apiService.post(`/bookmarked-films/${kinopoiskId}`, { data: bookmarkId });
    }

    public remove(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.apiService.delete(`/bookmarked-films/${kinopoiskId}/${bookmarkId}`);
    }
}

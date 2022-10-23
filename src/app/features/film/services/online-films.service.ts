import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoCdnResponse } from '../../video-cdn';
import { OnlineFilmsApi } from '../api';
import { DetailedFilmInfo, Film } from '../interfaces';
import { OnlineFilmsFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsService {
    constructor(
        private readonly onlineFilmsApi: OnlineFilmsApi,
        private readonly filtersState: OnlineFilmsFiltersState
    ) {}

    public get(kinopoiskId: string): Observable<Film> {
        return this.onlineFilmsApi.get(kinopoiskId);
    }

    public getDetailedInfo(kinopoiskId: string): Observable<DetailedFilmInfo> {
        return this.onlineFilmsApi.getDetailedInfo(kinopoiskId);
    }

    public updateAllByFilters(): Observable<VideoCdnResponse<Film>> {
        return this.onlineFilmsApi.getAllByFilters(this.filtersState.data!);
    }

    public download(kinopoiskId: string, mediaId: number): Observable<unknown> {
        return this.onlineFilmsApi.download(kinopoiskId, mediaId);
    }
}

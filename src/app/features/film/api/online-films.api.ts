import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { VideoCdnFilters, VideoCdnResponse } from '../../video-cdn';
import { DetailedFilmInfo, Film } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public get(kinopoiskId: string): Observable<Film> {
        return this.apiService.get<Film>(`/films/${kinopoiskId}`);
    }

    public getDetailedInfo(kinopoiskId: string): Observable<DetailedFilmInfo> {
        return this.apiService.get<DetailedFilmInfo>(`/films/${kinopoiskId}/detailed`);
    }

    public getAllByFilters(filters: VideoCdnFilters): Observable<VideoCdnResponse<Film>> {
        return this.apiService.get<VideoCdnResponse<Film>>(
            `/films`,
            { params: (filters as any) }
        );
    }

    public download(kinopoiskId: string, mediaId: number): Observable<unknown> {
        return this.apiService.post(`/films/${kinopoiskId}/download/${mediaId}`, {});
    }
}

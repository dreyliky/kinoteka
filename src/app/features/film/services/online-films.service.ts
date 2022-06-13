import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { VideoCdnResponse } from '../../video-cdn';
import { Film } from '../interfaces';
import { OnlineFilmsFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsService {
    constructor(
        private readonly apiService: ApiService,
        private readonly filtersState: OnlineFilmsFiltersState
    ) {}

    public get(kinopoiskId: string): Observable<Film> {
        return this.apiService.get<Film>(`/films/${kinopoiskId}`);
    }

    public updateAllByFilters(): Observable<VideoCdnResponse<Film>> {
        return this.apiService.get<VideoCdnResponse<Film>>(
            `/films`,
            { params: this.filtersState.data as any }
        );
    }

    public download(kinopoiskId: string, mediaId: number): Observable<unknown> {
        return this.apiService.post(`/films/${kinopoiskId}/download/${mediaId}`, {});
    }
}

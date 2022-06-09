import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable, tap } from 'rxjs';
import { VideoCdnResponse } from '../../video-cdn';
import { Film } from '../interfaces';
import { OnlineFilmsFiltersState, OnlineFilmsResponseState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsService {
    public get filmsResponse$(): Observable<VideoCdnResponse<Film> | null> {
        return this.filmsResponseState.data$;
    }

    constructor(
        private readonly apiService: ApiService,
        private readonly filmsResponseState: OnlineFilmsResponseState,
        private readonly filtersState: OnlineFilmsFiltersState
    ) {}

    public get(kinopoiskId: string): Observable<Film> {
        return this.apiService.get<Film>(`/films/${kinopoiskId}`);
    }

    public updateAllByFiltersIfAbsent(): Observable<VideoCdnResponse<Film> | null> {
        if (!this.filmsResponseState.data) {
            return this.updateAllByFilters();
        }

        return this.filmsResponse$;
    }

    public updateAllByFilters(): Observable<VideoCdnResponse<Film>> {
        this.filmsResponseState.set(null);

        return this.apiService.get<VideoCdnResponse<Film>>(
            `/films`,
            { params: this.filtersState.data as any }
        )
            .pipe(
                tap((response) => this.filmsResponseState.set(response))
            );
    }

    public download(kinopoiskId: string, mediaId: number): Observable<unknown> {
        return this.apiService.post(`/films/${kinopoiskId}/download/${mediaId}`, {});
    }
}

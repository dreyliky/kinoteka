import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { FilmsResponse } from '@features/film';
import { Observable, tap } from 'rxjs';
import { FilmsFiltersState, FilmsResponseState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class FilmsService {
    public get filmsResponse$(): Observable<FilmsResponse | null> {
        return this.filmsResponseState.data$;
    }

    constructor(
        private readonly apiService: ApiService,
        private readonly filmsResponseState: FilmsResponseState,
        private readonly filtersState: FilmsFiltersState
    ) {}

    public updateAllByFiltersIfAbsent(): Observable<FilmsResponse | null> {
        if (!this.filmsResponseState.data) {
            return this.updateAllByFilters();
        }

        return this.filmsResponse$;
    }

    public updateAllByFilters(): Observable<FilmsResponse> {
        this.filmsResponseState.set(null);

        return this.apiService.get<FilmsResponse>(
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmsResponse } from '@interfaces';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilmsFiltersState, FilmsResponseState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class FilmsService {
    public get filmsResponse$(): Observable<FilmsResponse | null> {
        return this.filmsResponseState.data$;
    }

    constructor(
        private readonly httpClient: HttpClient,
        private readonly filmsResponseState: FilmsResponseState,
        private readonly filtersState: FilmsFiltersState
    ) {}

    public updateAllByFilters(): Observable<FilmsResponse> {
        this.filmsResponseState.set(null);

        return this.httpClient.get<FilmsResponse>(
            `${environment.backendHost}/films`,
            { params: this.filtersState.data as any }
        )
            .pipe(
                tap((response) => this.filmsResponseState.set(response))
            );
    }

    public download(kinopoiskId: string): Observable<unknown> {
        return this.httpClient.post(`${environment.backendHost}/films/${kinopoiskId}/download`, {});
    }
}

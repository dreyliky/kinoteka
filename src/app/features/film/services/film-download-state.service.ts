import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { FilmDownloadStateEnum } from '@features/film';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilmDownloadStateService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public check(kinopoiskId: string): Observable<FilmDownloadStateEnum> {
        return this.apiService.get<FilmDownloadStateEnum>(`/films/${kinopoiskId}/state`);
    }
}

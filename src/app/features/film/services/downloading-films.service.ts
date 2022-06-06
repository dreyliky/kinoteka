import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { FilmQueue } from '@features/film';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadingFilmsService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(): Observable<FilmQueue[]> {
        return this.apiService.get<FilmQueue[]>(`/films/downloading`);
    }

    public cancel(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/films/downloading/${kinopoiskId}`);
    }
}

import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { DownloadedFilm } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(): Observable<DownloadedFilm[]> {
        return this.apiService.get<DownloadedFilm[]>(`/films/downloaded`);
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/films/downloaded/${kinopoiskId}`);
    }
}

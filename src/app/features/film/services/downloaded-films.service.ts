import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Film } from '@features/film';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(): Observable<Film[]> {
        return this.apiService.get<Film[]>(`/films/downloaded`);
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/films/downloaded/${kinopoiskId}`);
    }
}

import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { DownloadedFilm } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public get(kinopoiskId: string): Observable<DownloadedFilm> {
        return this.apiService.get<DownloadedFilm>(`/downloaded-films/${kinopoiskId}`);
    }

    public getMediaUrl(kinopoiskId: string): string {
        return `${this.apiService.hostUrl}/downloaded-films/${kinopoiskId}/media`;
    }

    public getAll(): Observable<DownloadedFilm[]> {
        return this.apiService.get<DownloadedFilm[]>(`/downloaded-films`);
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/downloaded-films/${kinopoiskId}`);
    }
}

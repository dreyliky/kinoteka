import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable, tap } from 'rxjs';
import { DownloadedFilm } from '../interfaces';
import { DownloadedFilmsState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsService {
    public readonly data$ = this.downloadedFilmsState.data$;

    constructor(
        private readonly apiService: ApiService,
        private readonly downloadedFilmsState: DownloadedFilmsState
    ) {}

    public get(kinopoiskId: string): Observable<DownloadedFilm> {
        return this.apiService.get<DownloadedFilm>(`/downloaded-films/${kinopoiskId}`);
    }

    public getMediaUrl(kinopoiskId: string): string {
        return `${this.apiService.hostUrl}/downloaded-films/${kinopoiskId}/media`;
    }

    public updateAllIfAbsent(): Observable<DownloadedFilm[] | null> {
        if (!this.downloadedFilmsState.data) {
            return this.updateAll();
        }

        return this.data$;
    }

    public updateAll(): Observable<DownloadedFilm[]> {
        return this.apiService.get<DownloadedFilm[]>(`/downloaded-films`)
            .pipe(
                tap((data) => this.downloadedFilmsState.set(data))
            );
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/downloaded-films/${kinopoiskId}`)
            .pipe(
                tap(() => this.downloadedFilmsState.removeItemById(kinopoiskId))
            );
    }
}

import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable, tap } from 'rxjs';
import { DownloadedFilm } from '../interfaces';
import { DownloadedFilmsState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsService {
    public get data$(): Observable<DownloadedFilm[] | null> {
        return this.downloadedFilmsState.data$;
    }

    constructor(
        private readonly apiService: ApiService,
        private readonly downloadedFilmsState: DownloadedFilmsState
    ) {}

    public updateAllIfAbsent(): Observable<DownloadedFilm[] | null> {
        if (!this.downloadedFilmsState.data) {
            return this.updateAll();
        }

        return this.data$;
    }

    public updateAll(): Observable<DownloadedFilm[]> {
        return this.apiService.get<DownloadedFilm[]>(`/films/downloaded`)
            .pipe(
                tap((data) => this.downloadedFilmsState.set(data))
            );
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/films/downloaded/${kinopoiskId}`);
    }
}

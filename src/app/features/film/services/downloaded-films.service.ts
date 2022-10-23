import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DownloadedFilmsApi } from '../api';
import { DownloadedFilm } from '../interfaces';
import { DownloadedFilmsState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsService {
    public readonly data$ = this.downloadedFilmsState.data$;

    constructor(
        private readonly downloadedFilmsApi: DownloadedFilmsApi,
        private readonly downloadedFilmsState: DownloadedFilmsState
    ) {}

    public get(kinopoiskId: string): Observable<DownloadedFilm> {
        return this.downloadedFilmsApi.get(kinopoiskId);
    }

    public getMediaUrl(kinopoiskId: string): string {
        return this.downloadedFilmsApi.getMediaUrl(kinopoiskId);
    }

    public updateAllIfAbsent(): Observable<DownloadedFilm[] | null> {
        if (!this.downloadedFilmsState.data) {
            return this.updateAll();
        }

        return this.data$;
    }

    public updateAll(): Observable<DownloadedFilm[]> {
        return this.downloadedFilmsApi.getAll()
            .pipe(
                tap((data) => this.downloadedFilmsState.set(data))
            );
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        return this.downloadedFilmsApi.delete(kinopoiskId)
            .pipe(
                tap(() => this.downloadedFilmsState.removeItemById(kinopoiskId))
            );
    }
}

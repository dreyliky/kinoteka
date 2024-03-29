import { Injectable } from '@angular/core';
import { FilmDownloadStateEnum } from '@features/film';
import { Observable } from 'rxjs';
import { FilmDownloadStatusApi } from '../api';

@Injectable({
    providedIn: 'root'
})
export class FilmDownloadStatusService {
    constructor(
        private readonly filmDownloadStatusApi: FilmDownloadStatusApi
    ) {}

    public check(kinopoiskId: string): Observable<FilmDownloadStateEnum> {
        return this.filmDownloadStatusApi.check(kinopoiskId);
    }
}

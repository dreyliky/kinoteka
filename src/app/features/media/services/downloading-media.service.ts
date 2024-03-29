import { Injectable } from '@angular/core';
import { MediaQueue } from '@features/media';
import { Observable } from 'rxjs';
import { DownloadingMediaApi } from '../api';

@Injectable({
    providedIn: 'root'
})
export class DownloadingMediaService {
    constructor(
        private readonly downloadingMediaApi: DownloadingMediaApi
    ) {}

    public getAll(): Observable<MediaQueue[]> {
        return this.downloadingMediaApi.getAll();
    }

    public cancel(kinopoiskId: string): Observable<unknown> {
        return this.downloadingMediaApi.cancel(kinopoiskId);
    }
}

import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DownloadedVideosApi } from '../api';
import { DownloadedVideo } from '../interfaces';
import { DownloadedVideosState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosService {
    public readonly data$ = this.downloadedVideosState.data$;

    constructor(
        private readonly downloadedVideosApi: DownloadedVideosApi,
        private readonly downloadedVideosState: DownloadedVideosState
    ) {}

    public get(id: string): Observable<DownloadedVideo> {
        return this.downloadedVideosApi.get(id);
    }

    public getMediaUrl(id: string): string {
        return this.downloadedVideosApi.getMediaUrl(id);
    }

    public updateAllIfAbsent(): Observable<DownloadedVideo[] | null> {
        if (!this.downloadedVideosState.data) {
            return this.updateAll();
        }

        return this.data$;
    }

    public updateAll(): Observable<DownloadedVideo[]> {
        return this.downloadedVideosApi.getAll()
            .pipe(
                tap((data) => this.downloadedVideosState.set(data))
            );
    }

    public delete(id: string): Observable<unknown> {
        return this.downloadedVideosApi.delete(id)
            .pipe(
                tap(() => this.downloadedVideosState.removeItemById(id))
            );
    }
}

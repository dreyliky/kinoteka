import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable, tap } from 'rxjs';
import { DownloadedVideo } from '../interfaces';
import { DownloadedVideosState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosService {
    public readonly data$ = this.downloadedVideosState.data$;

    constructor(
        private readonly apiService: ApiService,
        private readonly downloadedVideosState: DownloadedVideosState
    ) {}

    public get(id: string): Observable<DownloadedVideo> {
        return this.apiService.get<DownloadedVideo>(`/downloaded-videos/${id}`);
    }

    public getMediaUrl(id: string): string {
        return `${this.apiService.hostUrl}/downloaded-videos/${id}/media`;
    }

    public updateAllIfAbsent(): Observable<DownloadedVideo[] | null> {
        if (!this.downloadedVideosState.data) {
            return this.updateAll();
        }

        return this.data$;
    }

    public updateAll(): Observable<DownloadedVideo[]> {
        return this.apiService.get<DownloadedVideo[]>(`/downloaded-videos`)
            .pipe(
                tap((data) => this.downloadedVideosState.set(data))
            );
    }

    public delete(id: string): Observable<unknown> {
        return this.apiService.delete(`/downloaded-videos/${id}`)
            .pipe(
                tap(() => this.downloadedVideosState.removeItemById(id))
            );
    }
}

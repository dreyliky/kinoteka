import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { DownloadedVideo } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public get(id: string): Observable<DownloadedVideo> {
        return this.apiService.get<DownloadedVideo>(`/downloaded-videos/${id}`);
    }

    public getMediaUrl(id: string): string {
        return `${this.apiService.hostUrl}/downloaded-videos/${id}/media`;
    }

    public getAll(): Observable<DownloadedVideo[]> {
        return this.apiService.get<DownloadedVideo[]>(`/downloaded-videos`);
    }

    public delete(id: string): Observable<unknown> {
        return this.apiService.delete(`/downloaded-videos/${id}`);
    }
}

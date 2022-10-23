import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { MediaQueue } from '@features/media';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadingMediaApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(): Observable<MediaQueue[]> {
        return this.apiService.get<MediaQueue[]>(`/downloading-media`);
    }

    public cancel(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/downloading-media/${kinopoiskId}`);
    }
}

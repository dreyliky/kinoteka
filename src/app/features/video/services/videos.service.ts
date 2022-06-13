import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { Video } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getInfo(url: string): Observable<Video> {
        return this.apiService.get<Video>(`/videos/info?url=${url}`);
    }

    public download(url: string): Observable<unknown> {
        return this.apiService.post(`/videos/download`, { url });
    }

    public validateUrl(url: string): Observable<boolean> {
        return this.apiService.get<boolean>(`/videos/validate-url?url=${url}`);
    }
}

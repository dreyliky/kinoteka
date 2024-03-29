import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideosApi } from '../api';
import { Video } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    constructor(
        private readonly videosApi: VideosApi
    ) {}

    public getInfo(url: string): Observable<Video> {
        return this.videosApi.getInfo(url);
    }

    public download(url: string): Observable<unknown> {
        return this.videosApi.download(url);
    }

    public validateUrl(url: string): Observable<boolean> {
        return this.videosApi.validateUrl(url);
    }
}

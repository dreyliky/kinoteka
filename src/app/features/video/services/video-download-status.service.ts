import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoDownloadStatusApi } from '../api';
import { VideoDownloadStatusEnum } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class VideoDownloadStatusService {
    constructor(
        private readonly videoDownloadStatusApi: VideoDownloadStatusApi
    ) {}

    public check(id: string): Observable<VideoDownloadStatusEnum> {
        return this.videoDownloadStatusApi.check(id);
    }
}

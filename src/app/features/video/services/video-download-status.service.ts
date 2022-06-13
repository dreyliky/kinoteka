import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { VideoDownloadStatusEnum } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class VideoDownloadStatusService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public check(id: string): Observable<VideoDownloadStatusEnum> {
        return this.apiService.get<VideoDownloadStatusEnum>(`/videos/${id}/status`);
    }
}

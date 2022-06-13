import { Injectable } from '@angular/core';
import { DownloadedVideosService, Video } from '@features/video';
import { MediaDownloadHandler } from '../interfaces';

@Injectable()
export class VideoDownloadHandlerService implements MediaDownloadHandler<Video> {
    constructor(
        private readonly downloadedVideosService: DownloadedVideosService
    ) {}

    public getMediaTitle(media: Video): string {
        return media.title;
    }

    public onDownloadEnd(media: Video): void {
        this.downloadedVideosService.updateAll()
            .subscribe();
    }
}

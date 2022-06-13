import { Injectable } from '@angular/core';
import { MediaTypeEnum } from '@features/media';
import { MediaDownloadHandler } from '../interfaces';
import { FilmDownloadHandlerService, VideoDownloadHandlerService } from '../services';

@Injectable()
export class MediaDownloadHandlerFactory {
    private readonly handlerMap = new Map<MediaTypeEnum, MediaDownloadHandler<unknown>>()
        .set(MediaTypeEnum.Film, this.filmHandler)
        .set(MediaTypeEnum.Video, this.videoHandler);

    constructor(
        private readonly filmHandler: FilmDownloadHandlerService,
        private readonly videoHandler: VideoDownloadHandlerService
    ) {}
    
    public get(mediaType: MediaTypeEnum): MediaDownloadHandler<unknown> {
        return this.handlerMap.get(mediaType) as MediaDownloadHandler<unknown>;
    }
}

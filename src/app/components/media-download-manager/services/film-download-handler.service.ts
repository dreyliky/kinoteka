import { Injectable } from '@angular/core';
import { DownloadedFilmsService, Film } from '@features/film';
import { MediaDownloadHandler } from '../interfaces';

@Injectable()
export class FilmDownloadHandlerService implements MediaDownloadHandler<Film> {
    constructor(
        private readonly downloadedFilmsService: DownloadedFilmsService
    ) {}

    public getMediaTitle(media: Film): string {
        return media.title;
    }

    public onDownloadEnd(media: Film): void {
        this.downloadedFilmsService.updateAll()
            .subscribe();
    }
}

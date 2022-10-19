import { Injectable } from '@angular/core';
import { SocketEventEnum } from '@core/enums';
import { SocketService } from '@core/services';
import { Observable, Subject } from 'rxjs';
import { MediaDownloadProgress, MediaQueue } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadingMediaSocketService {
    public get progress$(): Observable<MediaDownloadProgress> {
        return this._progress$.asObservable();
    }

    public get onMediaDownloadStart$(): Observable<MediaQueue> {
        return this._onMediaDownloadStart$.asObservable();
    }

    public get onMediaDownloadEnd$(): Observable<MediaQueue> {
        return this._onMediaDownloadEnd$.asObservable();
    }

    public get onMediaDownloadCancel$(): Observable<MediaQueue> {
        return this._onMediaDownloadCancel$.asObservable();
    }

    private readonly _progress$ = new Subject<MediaDownloadProgress>();
    private readonly _onMediaDownloadStart$ = new Subject<MediaQueue>();
    private readonly _onMediaDownloadEnd$ = new Subject<MediaQueue>();
    private readonly _onMediaDownloadCancel$ = new Subject<MediaQueue>();

    constructor(
        private readonly socketService: SocketService
    ) {
        this.initFilmsProgressObserver();
        this.initFilmDownloadStartObserver();
        this.initFilmDownloadEndObserver();
        this.initFilmDownloadCancelObserver();
    }

    private initFilmsProgressObserver(): void {
        this.socketService.socket.on(SocketEventEnum.MediaProgress, (filmProgress: MediaDownloadProgress) => {
            this._progress$.next(filmProgress);
        });
    }

    private initFilmDownloadStartObserver(): void {
        this.socketService.socket.on(SocketEventEnum.MediaDownloadStart, (mediaQueue: MediaQueue) => {
            this._onMediaDownloadStart$.next(mediaQueue);
        });
    }

    private initFilmDownloadEndObserver(): void {
        this.socketService.socket.on(SocketEventEnum.MediaDownloadEnd, (mediaQueue: MediaQueue) => {
            this._onMediaDownloadEnd$.next(mediaQueue);
        });
    }

    private initFilmDownloadCancelObserver(): void {
        this.socketService.socket.on(SocketEventEnum.MediaDownloadCancel, (mediaQueue: MediaQueue) => {
            this._onMediaDownloadCancel$.next(mediaQueue);
        });
    }
}

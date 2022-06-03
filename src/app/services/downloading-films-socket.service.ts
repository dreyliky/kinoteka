import { Injectable } from '@angular/core';
import { SocketService } from '@core';
import { SocketEventEnum } from '@enums';
import { FilmProgress } from '@interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadingFilmsSocketService {
    public get progress$(): Observable<FilmProgress> {
        return this._progress$.asObservable();
    }

    public get onFilmDownloadEnd$(): Observable<string> {
        return this._onFilmDownloadEnd$.asObservable();
    }

    public get onFilmDownloadCancel$(): Observable<string> {
        return this._onFilmDownloadCancel$.asObservable();
    }

    private _progress$ = new Subject<FilmProgress>();
    private _onFilmDownloadEnd$ = new Subject<string>();
    private _onFilmDownloadCancel$ = new Subject<string>();

    constructor(
        private readonly socketService: SocketService
    ) {
        this.initFilmsProgressObserver();
        this.initFilmDownloadEndObserver();
        this.initFilmDownloadCancelObserver();
    }

    private initFilmsProgressObserver(): void {
        this.socketService.socket.on(SocketEventEnum.FilmProgress, (filmProgress) => {
            this._progress$.next(filmProgress);
        });
    }

    private initFilmDownloadEndObserver(): void {
        this.socketService.socket.on(SocketEventEnum.FilmDownloadEnd, (kinopoiskId) => {
            this._onFilmDownloadEnd$.next(kinopoiskId);
        });
    }

    private initFilmDownloadCancelObserver(): void {
        this.socketService.socket.on(SocketEventEnum.FilmDownloadCancel, (kinopoiskId) => {
            this._onFilmDownloadCancel$.next(kinopoiskId);
        });
    }
}

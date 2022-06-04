import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '@core';
import { SocketEventEnum } from '@enums';
import { Film, FilmProgress } from '@interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadingFilmsSocketService {
    public get progress$(): Observable<FilmProgress> {
        return this._progress$.asObservable();
    }

    public get onFilmDownloadStart$(): Observable<Film> {
        return this._onFilmDownloadStart$.asObservable();
    }

    public get onFilmDownloadEnd$(): Observable<Film> {
        return this._onFilmDownloadEnd$.asObservable();
    }

    public get onFilmDownloadCancel$(): Observable<Film> {
        return this._onFilmDownloadCancel$.asObservable();
    }

    private _progress$ = new Subject<FilmProgress>();
    private _onFilmDownloadStart$ = new Subject<Film>();
    private _onFilmDownloadEnd$ = new Subject<Film>();
    private _onFilmDownloadCancel$ = new Subject<Film>();

    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly socketService: SocketService
    ) {
        this.initFilmsProgressObserver();
        this.initFilmDownloadStartObserver();
        this.initFilmDownloadEndObserver();
        this.initFilmDownloadCancelObserver();
    }

    private initFilmsProgressObserver(): void {
        this.socketService.socket.on(SocketEventEnum.FilmProgress, (filmProgress: FilmProgress) => {
            this._progress$.next(filmProgress);
        });
    }

    private initFilmDownloadStartObserver(): void {
        this.socketService.socket.on(SocketEventEnum.FilmDownloadStart, (film: Film) => {
            this.snackBar.open(`Починаємо завантаження: ${film.title}`, '', { duration: 3000 });
            this._onFilmDownloadStart$.next(film);
        });
    }

    private initFilmDownloadEndObserver(): void {
        this.socketService.socket.on(SocketEventEnum.FilmDownloadEnd, (film: Film) => {
            this.snackBar.open(`Успішно завантажено: ${film.title}`, '', { duration: 3000 });
            this._onFilmDownloadEnd$.next(film);
        });
    }

    private initFilmDownloadCancelObserver(): void {
        this.socketService.socket.on(SocketEventEnum.FilmDownloadCancel, (film: Film) => {
            this.snackBar.open(`Завантаження відмінено: ${film.title}`, '', { duration: 3000 });
            this._onFilmDownloadCancel$.next(film);
        });
    }
}

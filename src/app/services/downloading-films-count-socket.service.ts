import { Injectable } from '@angular/core';
import { SocketService } from '@core';
import { SocketEventEnum } from '@enums';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadingFilmsCountSocketService {
    public get data$(): Observable<number> {
        return this._data$.asObservable();
    }

    private _data$ = new BehaviorSubject<number>(0);

    constructor(
        private readonly socketService: SocketService
    ) {
        this.initFilmsCountObserver();
    }

    private initFilmsCountObserver(): void {
        this.socketService.socket.on(SocketEventEnum.DownloadingFilmsCount, (count) => {
            this._data$.next(count);
        });
    }
}

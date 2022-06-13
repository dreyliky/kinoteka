import { Injectable } from '@angular/core';
import { SocketEventEnum } from '@core/enums';
import { SocketService } from '@core/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadingMediaCountSocketService {
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
        this.socketService.socket.on(SocketEventEnum.DownloadingMediaCount, (count) => {
            this._data$.next(count);
        });
    }
}

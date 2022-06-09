import { Injectable } from '@angular/core';
import { SocketEventEnum } from '@core/enums';
import { CastDto } from '@core/interfaces';
import { SocketService } from '@core/services';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientCastSocketService {
    public get onCast$(): Observable<CastDto> {
        return this._onCast$.asObservable();
    }

    private _onCast$ = new Subject<CastDto>();

    constructor(
        private readonly socketService: SocketService
    ) {
        this.initCastEventObserver();
    }

    private initCastEventObserver(): void {
        this.socketService.socket.on(SocketEventEnum.Cast, (castDto: CastDto) => {
            this._onCast$.next(castDto);
        });
    }
}

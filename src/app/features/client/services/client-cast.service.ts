import { Injectable } from '@angular/core';
import { CastTypeEnum } from '@core/enums';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { ClientCastApi } from '../api';

@Injectable({
    providedIn: 'root'
})
export class ClientCastService {
    constructor(
        private readonly clientCastApi: ClientCastApi,
        private readonly deviceService: DeviceDetectorService
    ) {}

    public cast(socketId: string, type: CastTypeEnum, data: unknown): Observable<unknown> {
        return this.clientCastApi.cast({
            socketId,
            type,
            data,
            initiatorDeviceInfo: this.deviceService.getDeviceInfo()
        });
    }
}

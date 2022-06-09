import { Injectable } from '@angular/core';
import { CastTypeEnum } from '@core/enums';
import { CastDto } from '@core/interfaces';
import { ApiService } from '@core/services';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientCastService {
    constructor(
        private readonly apiService: ApiService,
        private readonly deviceService: DeviceDetectorService
    ) {}

    public cast(socketId: string, type: CastTypeEnum, data: unknown): Observable<unknown> {
        return this.apiService.post(`/clients/${socketId}/cast`, <CastDto>{
            type,
            data,
            initiatorDeviceInfo: this.deviceService.getDeviceInfo()
        });
    }
}

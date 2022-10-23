import { Injectable } from '@angular/core';
import { CastTypeEnum } from '@core/enums';
import { CastDto } from '@core/interfaces';
import { ApiService } from '@core/services';
import { DeviceInfo } from 'ngx-device-detector';
import { Observable } from 'rxjs';

interface CastParams {
    readonly socketId: string;
    readonly type: CastTypeEnum;
    readonly data: unknown;
    readonly initiatorDeviceInfo: DeviceInfo;
}

@Injectable({
    providedIn: 'root'
})
export class ClientCastApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public cast({ socketId, type, data, initiatorDeviceInfo }: CastParams): Observable<unknown> {
        return this.apiService.post(`/clients/${socketId}/cast`, <CastDto>{
            type,
            data,
            initiatorDeviceInfo
        });
    }
}

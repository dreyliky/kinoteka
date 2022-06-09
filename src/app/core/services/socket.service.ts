import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { SocketDto } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    public readonly socket = io(environment.backendWsHost, {
        query: {
            deviceInfo: JSON.stringify(this.deviceService.getDeviceInfo())
        } as SocketDto
    });

    constructor(
        private readonly deviceService: DeviceDetectorService
    ) {}
}

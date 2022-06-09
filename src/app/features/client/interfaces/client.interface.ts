import { DeviceInfo } from 'ngx-device-detector';

export interface Client {
    readonly socketId: string;
    readonly deviceInfo: DeviceInfo;
}

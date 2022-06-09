import { CastTypeEnum } from '@core/enums';
import { DeviceInfo } from 'ngx-device-detector';

export interface CastDto<T = unknown> {
    readonly type: CastTypeEnum;
    readonly data: T;
    readonly initiatorDeviceInfo: DeviceInfo;
}

import { MediaTypeEnum } from '../enums';

export interface MediaDownloadProgress<O = unknown> {
    readonly id: string;
    readonly mediaType: MediaTypeEnum;
    readonly downloadOptions: O;
    readonly downloadProgress: number;
}

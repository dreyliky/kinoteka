import { VideoFormat } from './video-format.interface';

export interface Video {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly duration: number;
    readonly authorName: string;
    readonly previewUrl: string;
    readonly bestFormat: VideoFormat;
}

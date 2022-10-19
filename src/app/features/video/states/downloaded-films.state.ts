import { Injectable } from '@angular/core';
import { ArrayState } from 'ngx-base-state';
import { DownloadedVideo } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosState extends ArrayState<DownloadedVideo> {
    protected override getItemId(video: DownloadedVideo) {
        return video.id;
    }
}

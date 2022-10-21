import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';
import { DownloadedVideo } from '../interfaces';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosState extends ArrayState<DownloadedVideo> {
    protected override getItemId(video: DownloadedVideo) {
        return video.id;
    }
}

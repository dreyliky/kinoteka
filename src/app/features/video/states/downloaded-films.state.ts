import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { DownloadedVideo } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosState extends BaseState<DownloadedVideo[] | null> {
    public deleteById(id: string): void {
        if (this.data) {
            const filteredVideos = this.data
                .filter((video) => (video.id !== id));
            
            this.set(filteredVideos);
        }
    }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookmarkEnum } from '@features/bookmark';
import { DownloadedVideo } from '@features/video';

@Component({
    selector: 'app-downloaded-video-card',
    templateUrl: './downloaded-video-card.component.html',
    styleUrls: ['./downloaded-video-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadedVideoCardComponent {
    @Input()
    public video!: DownloadedVideo;

    @Input()
    public bookmarks!: BookmarkEnum[];
}

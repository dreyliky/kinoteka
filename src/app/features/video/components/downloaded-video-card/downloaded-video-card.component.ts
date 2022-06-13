import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DownloadedVideo } from '../../interfaces';
import { DownloadedVideoPreviewLoader } from './downloaded-video-preview-loader.interface';
import { DOWNLOADED_VIDEO_PREVIEW_LOADER } from './downloaded-video-preview-loader.token';

@Component({
    selector: 'downloaded-video-card',
    templateUrl: './downloaded-video-card.component.html',
    styleUrls: ['./downloaded-video-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadedVideoCardComponent {
    @Input()
    public data!: DownloadedVideo;

    public previewBgCss$!: Observable<string>;

    constructor(
        @Inject(DOWNLOADED_VIDEO_PREVIEW_LOADER)
        private readonly previewLoader: DownloadedVideoPreviewLoader
    ) {}

    public ngOnInit(): void {
        this.initPreviewBgCssObservable();
    }

    private initPreviewBgCssObservable(): void {
        this.previewBgCss$ = this.previewLoader.getPreview(this.data.id)
            .pipe(map((preview) => `url(${preview})`))
    }
}

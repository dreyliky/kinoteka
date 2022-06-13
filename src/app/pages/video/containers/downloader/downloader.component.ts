import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Video, VideoDownloadStatusEnum, VideoDownloadStatusService, VideosService } from '@features/video';
import { ContentZoneService } from '@layouts';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { SearchStringState, SearchVideoState } from './search';

interface VideoMetadata {
    readonly data: Video | null;
    readonly status: VideoDownloadStatusEnum;
}

@Component({
    selector: 'app-downloader',
    templateUrl: './downloader.component.html',
    styleUrls: ['./downloader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        SearchVideoState,
        SearchStringState
    ]
})
export class DownloaderComponent implements OnInit {
    public readonly downloadStatusEnum = VideoDownloadStatusEnum;

    public videoMetadata$!: Observable<VideoMetadata>;

    constructor(
        private readonly contentZoneService: ContentZoneService,
        private readonly videosService: VideosService,
        private readonly videoDownloadStatusService: VideoDownloadStatusService,
        private readonly searchStringState: SearchStringState,
        private readonly searchVideoState: SearchVideoState
    ) {}

    public ngOnInit(): void {
        this.initVideoMetadataObservable();
    }

    public onDownloadButtonClick(): void {
        const video = this.searchVideoState.data;

        if (video) {
            this.downloadVideo();
            this.searchVideoState.clear();
            this.searchStringState.clear();
            this.contentZoneService.scrollTop();
        }
    }

    private getVideoDownloadStatus(id: string | undefined): Observable<VideoDownloadStatusEnum> {
        return (!!id) ? this.videoDownloadStatusService.check(id) : of(VideoDownloadStatusEnum.Undownloaded);
    }

    private initVideoMetadataObservable(): void {
        this.videoMetadata$ = this.searchVideoState.data$
            .pipe(
                switchMap((video) => forkJoin({
                    data: of(video),
                    status: this.getVideoDownloadStatus(video?.id)
                }))
            );
    }

    private downloadVideo(): void {
        this.videosService.download(this.searchStringState.data as string)
            .subscribe();
    }
}

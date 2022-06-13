import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { DestroyService } from '@core/services';
import { DownloadingMediaSocketService, MediaTypeEnum } from '@features/media';
import { DownloadedVideo, DownloadedVideosService, DOWNLOADED_VIDEO_PREVIEW_LOADER, FilteredDownloadedVideosService } from '@features/video';
import { ContentZoneService, HeaderService } from '@layouts';
import { WatchRoutingEnum } from '@pages/watch/enums';
import { filter, merge, Observable, switchMap, takeUntil } from 'rxjs';
import { DownloadedVideoPreviewLoaderService } from './downloaded-video-preview-loader.service';
import { HeaderPortalContentComponent } from './header-portal-content';

@Component({
    selector: 'app-downloaded',
    templateUrl: './downloaded.component.html',
    styleUrls: ['./downloaded.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DOWNLOADED_VIDEO_PREVIEW_LOADER,
            useClass: DownloadedVideoPreviewLoaderService
        },
        DestroyService
    ]
})
export class DownloadedComponent implements OnInit {
    public filteredVideos$!: Observable<DownloadedVideo[]>;
    public allDownloadedVideos$!: Observable<DownloadedVideo[] | null>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly router: Router,
        private readonly headerService: HeaderService,
        private readonly contentZoneService: ContentZoneService,
        private readonly downloadingMediaSocketService: DownloadingMediaSocketService,
        private readonly downloadedVideosService: DownloadedVideosService,
        private readonly filteredDownloadedVideosService: FilteredDownloadedVideosService
    ) {}

    public ngOnInit(): void {
        this.filteredVideos$ = this.filteredDownloadedVideosService.data$;
        this.allDownloadedVideos$ = this.downloadedVideosService.data$;

        this.headerService.setPortalComponent(HeaderPortalContentComponent);
        this.updateVideosIfAbsent();
        this.initVideosFiltersObserver();
        this.initVideosDownloadingResultObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
    }

    public onVideoClick(video: DownloadedVideo): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Watch}/${WatchRoutingEnum.DownloadedVideo}/${video.id}`);
    }

    private updateVideosIfAbsent(): void {
        this.downloadedVideosService.updateAllIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initVideosFiltersObserver(): void {
        this.filteredDownloadedVideosService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.contentZoneService.scrollTop());
    }

    private initVideosDownloadingResultObserver(): void {
        merge(
            this.downloadingMediaSocketService.onMediaDownloadStart$,
            this.downloadingMediaSocketService.onMediaDownloadCancel$,
            this.downloadingMediaSocketService.onMediaDownloadEnd$
        )
            .pipe(
                filter(({ type }) => (type === MediaTypeEnum.Video)),
                switchMap(() => this.downloadedVideosService.updateAll()),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }
}

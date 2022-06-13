import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum, CastTypeEnum } from '@core/enums';
import { DestroyService, ToastService } from '@core/services';
import { DownloadedVideo, DownloadedVideosService } from '@features/video';
import { VideoRoutingEnum } from '@pages/video/enums';
import { delayWhen, filter, Observable, takeUntil, tap } from 'rxjs';
import { VideoDeleteBottomSheetComponent } from './components';
import { DownloadedVideoDetailsRouteParamEnum as Param } from './enums';

@Component({
    selector: 'app-downloaded-video',
    templateUrl: './downloaded-video.component.html',
    styleUrls: ['../../styles/container-base.styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class DownloadedVideoComponent implements OnInit {
    public videoUrl!: string;
    public video$!: Observable<DownloadedVideo>;

    public readonly castType = CastTypeEnum.DownloadedVideo;

    private readonly openedVideoId = this.activatedRoute.snapshot.paramMap
        .get(Param.Id) as string;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly toastService: ToastService,
        private readonly bottomSheet: MatBottomSheet,
        private readonly downloadedVideosService: DownloadedVideosService,
    ) {}

    public ngOnInit(): void {
        this.videoUrl = this.downloadedVideosService.getMediaUrl(this.openedVideoId);
        this.video$ = this.downloadedVideosService.get(this.openedVideoId);
    }

    public onCloseButtonClick(): void {
        this.openDownloadedVideosPage();
    }

    public onDeleteButtonClick(video: DownloadedVideo): void {
        this.bottomSheet.open(VideoDeleteBottomSheetComponent)
            .afterDismissed()
            .pipe(
                filter(Boolean),
                delayWhen(() => this.downloadedVideosService.delete(video.id)),
                tap(() => this.toastService.open('Відео видалено.')),
                tap(() => this.openDownloadedVideosPage()),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }

    private openDownloadedVideosPage(): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Video}/${VideoRoutingEnum.Downloaded}`);
    }
}

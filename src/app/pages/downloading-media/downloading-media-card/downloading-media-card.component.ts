import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DestroyService } from '@core/services';
import { DownloadingMediaService, DownloadingMediaSocketService, MediaQueue, MediaTypeEnum } from '@features/media';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { MediaDownloadCancelBottomSheetComponent } from '../media-download-cancel-bottom-sheet';

@Component({
    selector: 'app-downloading-media-card',
    templateUrl: './downloading-media-card.component.html',
    styleUrls: ['./downloading-media-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadingMediaCardComponent implements OnInit {
    @Input()
    public mediaQueue!: MediaQueue;

    public readonly mediaTypeEnum = MediaTypeEnum;

    public get isDownloading(): boolean {
        return (this.downloadProgress > 0);
    }

    public get media(): any {
        return this.mediaQueue.data;
    }

    public downloadProgress: number = 0;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly bottomSheet: MatBottomSheet,
        private readonly downloadedMediaService: DownloadingMediaService,
        private readonly downloadingMediaProgressSocketService: DownloadingMediaSocketService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.downloadProgress = this.mediaQueue.downloadProgress;

        this.initMediaProgressObserver();
    }

    public onCancelButtonClick(mediaQueue: MediaQueue): void {
        this.bottomSheet.open(MediaDownloadCancelBottomSheetComponent)
            .afterDismissed()
            .pipe(
                filter(Boolean),
                switchMap(() => this.downloadedMediaService.cancel(mediaQueue.id)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }

    private initMediaProgressObserver(): void {
        this.downloadingMediaProgressSocketService.progress$
            .pipe(
                filter(({ id }) => (this.mediaQueue.id === id)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(({ downloadProgress }) => {
                this.downloadProgress = downloadProgress;

                this.changeDetector.detectChanges();
            });
    }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { DownloadingMediaService, DownloadingMediaSocketService, MediaQueue } from '@features/media';
import { merge, Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-downloading-media',
    templateUrl: './downloading-media.component.html',
    styleUrls: ['./downloading-media.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class DownloadingMediaComponent implements OnInit {
    public mediaQueueArray: MediaQueue[] | null = null;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly downloadedMediaService: DownloadingMediaService,
        private readonly downloadingMediaSocketService: DownloadingMediaSocketService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.updateMediaQueueArray();
        this.initMediaDownloadingResultObserver();
    }

    private updateMediaQueueArray(): void {
        this.mediaQueueArray = null;

        this.downloadedMediaService.getAll()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((data) => {
                this.mediaQueueArray = data;

                this.changeDetector.detectChanges();
            })
    }

    private initMediaDownloadingResultObserver(): void {
        merge(
            this.downloadingMediaSocketService.onMediaDownloadStart$,
            this.downloadingMediaSocketService.onMediaDownloadCancel$,
            this.downloadingMediaSocketService.onMediaDownloadEnd$
        )
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.updateMediaQueueArray());
    }
}

import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DestroyService, ToastService } from '@core/services';
import { DownloadingMediaSocketService } from '@features/media';
import { Observable, takeUntil } from 'rxjs';
import { MediaDownloadHandlerFactory } from './factories';
import { FilmDownloadHandlerService, VideoDownloadHandlerService } from './services';

@Component({
    selector: 'global-media-download-manager',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MediaDownloadHandlerFactory,
        FilmDownloadHandlerService,
        VideoDownloadHandlerService,
        DestroyService
    ]
})
export class MediaDownloadManagerComponent implements OnInit {
    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly mediaDownloadHandlerFactory: MediaDownloadHandlerFactory,
        private readonly downloadingMediaSocketService: DownloadingMediaSocketService,
        private readonly toastService: ToastService
    ) {}

    public ngOnInit(): void {
        this.initMediaDownloadStartObserver();
        this.initMediaDownloadEndObserver();
        this.initMediaDownloadCancelObserver();
    }

    private initMediaDownloadStartObserver(): void {
        this.downloadingMediaSocketService.onMediaDownloadStart$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((mediaQueue) => {
                const downloadHandler = this.mediaDownloadHandlerFactory.get(mediaQueue.type);
                const mediaTitle = downloadHandler.getMediaTitle(mediaQueue.data);

                this.toastService.open(`Починаємо завантаження: ${mediaTitle}...`);
                downloadHandler.onDownloadStart?.(mediaQueue.data);
            });
    }

    private initMediaDownloadEndObserver(): void {
        this.downloadingMediaSocketService.onMediaDownloadEnd$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((mediaQueue) => {
                const downloadHandler = this.mediaDownloadHandlerFactory.get(mediaQueue.type);
                const mediaTitle = downloadHandler.getMediaTitle(mediaQueue.data);

                this.toastService.open(`${mediaTitle}: успішно завантажено!`);
                downloadHandler.onDownloadEnd?.(mediaQueue.data);
            });
    }

    private initMediaDownloadCancelObserver(): void {
        this.downloadingMediaSocketService.onMediaDownloadCancel$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((mediaQueue) => {
                const downloadHandler = this.mediaDownloadHandlerFactory.get(mediaQueue.type);
                const mediaTitle = downloadHandler.getMediaTitle(mediaQueue.data);

                this.toastService.open(`Завантаження відмінено: ${mediaTitle}`);
                downloadHandler.onDownloadCancel?.(mediaQueue.data);
            });
    }
}

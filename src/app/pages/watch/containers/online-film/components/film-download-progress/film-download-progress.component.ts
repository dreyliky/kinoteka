import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { DestroyService } from '@core/services';
import { FilmDownloaderOptions } from '@features/film';
import { DownloadingMediaSocketService, MediaTypeEnum } from '@features/media';
import { merge, Observable } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { OpenedFilmState } from '../../states';

@Component({
    selector: 'app-film-download-progress',
    templateUrl: './film-download-progress.component.html',
    styleUrls: ['./film-download-progress.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class FilmDownloadProgressComponent implements OnInit {
    @Output()
    public readonly downloadEnd = new EventEmitter();

    public progress$!: Observable<number>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly openedFilmState: OpenedFilmState,
        private readonly downloadingMediaSocketService: DownloadingMediaSocketService
    ) {}

    public ngOnInit(): void {
        this.initProgressObservable();
        this.initEndEventsObserver();
    }

    private initEndEventsObserver(): void {
        merge(
            this.downloadingMediaSocketService.onMediaDownloadCancel$,
            this.downloadingMediaSocketService.onMediaDownloadEnd$
        )
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.downloadEnd.emit());
    }

    private initProgressObservable(): void {
        this.progress$ = this.downloadingMediaSocketService.progress$
            .pipe(
                filter((dto) => (dto.mediaType === MediaTypeEnum.Film)),
                filter(({ downloadOptions }) => (this.openedFilmState.data!.kinopoiskId === (downloadOptions as FilmDownloaderOptions).kinopoiskId)),
                map(({ downloadProgress }) => downloadProgress),
                startWith(0),
                takeUntil(this.viewDestroyed$)
            );
    }
}

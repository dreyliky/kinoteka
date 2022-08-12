import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { DestroyService } from '@core/services';
import { Film, FilmDownloadStateEnum, FilmDownloadStatusService, FilmMedia, OnlineFilmsService } from '@features/film';
import { Observable, takeUntil } from 'rxjs';
import { OpenedFilmState } from '../../states';

@Component({
    selector: 'app-download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class DownloadButtonComponent {
    public readonly filmDownloadStateEnum = FilmDownloadStateEnum;
    public filmDownloadState: FilmDownloadStateEnum | null = null;

    public get film(): Film {
        return this.openedFilmState.data as Film;
    }

    public get isDownloadButtonVisible(): boolean {
        return (this.filmDownloadState !== null);
    }

    public get isDownloadButtonDisabled(): boolean {
        return (this.filmDownloadState !== FilmDownloadStateEnum.Undownloaded);
    }

    public get downloadButtonColor(): string {
        return (this.filmDownloadState === FilmDownloadStateEnum.Undownloaded) ? 'accent' : '';
    }

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly filmsService: OnlineFilmsService,
        private readonly openedFilmState: OpenedFilmState,
        private readonly filmDownloadStatusService: FilmDownloadStatusService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initFilmDownloadState();
    }

    public onDownloadButtonClick(media: FilmMedia): void {
        this.filmDownloadState = FilmDownloadStateEnum.Downloading;

        this.filmsService.download(this.openedFilmState.data!.kinopoiskId, media.translationId)
            .subscribe();
    }

    public onDownloadEnd(): void {
        this.initFilmDownloadState();
    }

    private initFilmDownloadState(): void {
        this.filmDownloadStatusService.check(this.openedFilmState.data!.kinopoiskId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((state) => {
                this.filmDownloadState = state;

                this.changeDetector.detectChanges();
            });
    }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { DestroyService } from '@core/services';
import { Film, FilmDownloadStateEnum, FilmDownloadStateService, FilmMedia, OnlineFilmsService } from '@features/film';
import { Observable, takeUntil } from 'rxjs';

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
    @Input()
    public film!: Film;
    
    public readonly filmDownloadStateEnum = FilmDownloadStateEnum;
    public filmDownloadState: FilmDownloadStateEnum | null = null;

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
        private readonly filmDownloadStatusService: FilmDownloadStateService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initFilmDownloadState();
    }

    public onDownloadButtonClick(media: FilmMedia): void {
        this.filmDownloadState = FilmDownloadStateEnum.Downloading;

        this.filmsService.download(this.film.kinopoiskId, media.translationId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    public onDownloadEnd(): void {
        this.initFilmDownloadState();
    }

    private initFilmDownloadState(): void {
        this.filmDownloadStatusService.check(this.film.kinopoiskId)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((state) => {
                this.filmDownloadState = state;

                this.changeDetector.detectChanges();
            });
    }
}

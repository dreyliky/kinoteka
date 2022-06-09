import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { Film, FilmDownloadStateEnum, FilmDownloadStateService, FilmMedia, OnlineFilmsService } from '@features/film';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadButtonComponent implements OnDestroy {
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

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly filmsService: OnlineFilmsService,
        private readonly filmDownloadStatusService: FilmDownloadStateService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initFilmDownloadState();
    }

    public ngOnDestroy(): void {
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
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

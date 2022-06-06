import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Film, FilmDownloadStateEnum, FilmDownloadStateService, FilmMediaFileMetadata, FilmMediaFilesService, FilmsService } from '@features/film';
import { Observable, share } from 'rxjs';

@Component({
    selector: 'app-download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadButtonComponent {
    @Input()
    public film!: Film;
    
    public readonly filmDownloadStateEnum = FilmDownloadStateEnum;
    public filmDownloadState: FilmDownloadStateEnum | null = null;

    public mediaFiles$!: Observable<FilmMediaFileMetadata[]>;

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
        private readonly filmsService: FilmsService,
        private readonly filmDownloadStatusService: FilmDownloadStateService,
        private readonly filmMediaFilesService: FilmMediaFilesService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initMediaFilesObservable();
        this.initFilmDownloadState();
    }

    public onDownloadButtonClick(): void {
        this.filmDownloadState = FilmDownloadStateEnum.Downloading;

        this.filmsService.download(this.film.kinopoiskId)
            .subscribe();
    }

    private initFilmDownloadState(): void {
        this.filmDownloadStatusService.check(this.film.kinopoiskId)
            .subscribe((state) => {
                this.filmDownloadState = state;

                this.changeDetector.detectChanges();
            });
    }

    private initMediaFilesObservable(): void {
        this.mediaFiles$ = this.filmMediaFilesService.getAll(this.film.kinopoiskId)
            .pipe(share());
    }
}

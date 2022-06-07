import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Film, FilmDownloadStateEnum, FilmDownloadStateService } from '@features/film';

@Component({
    selector: 'app-film-details-window',
    templateUrl: './film-details-window.component.html',
    styleUrls: ['./film-details-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDetailsWindowComponent implements OnInit {
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
        @Inject(MAT_DIALOG_DATA) public readonly data: Film,
        private readonly filmDownloadStatusService: FilmDownloadStateService,
        private readonly dialog: MatDialogRef<Film>,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initFilmDownloadState();
    }

    public onCloseButtonClick(): void {
        this.dialog.close();
    }

    private initFilmDownloadState(): void {
        this.filmDownloadStatusService.check(this.data.kinopoiskId)
            .subscribe((state) => {
                this.filmDownloadState = state;

                this.changeDetector.detectChanges();
            });
    }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DownloadedFilm, DownloadedFilmsService, DOWNLOADED_FILM_PREVIEW_LOADER, DownloadingFilmsSocketService } from '@features/film';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DownloadedFilmPreviewLoaderService } from './downloaded-film-preview-loader.service';
import { FilmDetailsWindowComponent } from './film-details-window';

@Component({
    selector: 'app-downloaded-section',
    templateUrl: './downloaded-section.component.html',
    styleUrls: ['./downloaded-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DOWNLOADED_FILM_PREVIEW_LOADER,
            useClass: DownloadedFilmPreviewLoaderService
        }
    ]
})
export class DownloadedSectionComponent implements OnInit, OnDestroy {
    public films: DownloadedFilm[] | null = null;

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly dialogService: MatDialog,
        private readonly downloadingFilmsSocketService: DownloadingFilmsSocketService,
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.updateFilms();
        this.initFilmsDownloadingResultObserver();
    }

    public ngOnDestroy(): void {
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
    }

    public onFilmClick(data: DownloadedFilm): void {
        this.dialogService.open(FilmDetailsWindowComponent, {
            width: '100%',
            minWidth: '100%',
            height: '100%',
            disableClose: true,
            panelClass: 'film-details-pane',
            autoFocus: true,
            data
        })
            .afterClosed()
            .pipe(filter(Boolean))
            .subscribe(() => this.updateFilms());
    }

    private updateFilms(): void {
        this.films = null;

        this.downloadedFilmsService.getAll()
            .subscribe((films) => {
                this.films = films;

                this.changeDetector.detectChanges();
            })
    }

    private initFilmsDownloadingResultObserver(): void {
        merge(
            this.downloadingFilmsSocketService.onFilmDownloadStart$,
            this.downloadingFilmsSocketService.onFilmDownloadCancel$,
            this.downloadingFilmsSocketService.onFilmDownloadEnd$
        )
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.updateFilms());
    }
}

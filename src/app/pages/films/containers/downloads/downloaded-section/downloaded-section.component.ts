import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DownloadedFilm, DownloadedFilmsService, DOWNLOADED_FILM_PREVIEW_LOADER, DownloadingFilmsSocketService, FilteredDownloadedFilmsService } from '@features/film';
import { merge, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
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
    public films$!: Observable<DownloadedFilm[]>;

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly dialogService: MatDialog,
        private readonly downloadingFilmsSocketService: DownloadingFilmsSocketService,
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly filteredDownloadedFilmsService: FilteredDownloadedFilmsService
    ) {}

    public ngOnInit(): void {
        this.films$ = this.filteredDownloadedFilmsService.data$;

        this.updateFilmsIfAbsent();
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
            .pipe(
                filter(Boolean),
                switchMap(() => this.downloadedFilmsService.updateAll())
            )
            .subscribe();
    }

    private updateFilmsIfAbsent(): void {
        this.downloadedFilmsService.updateAllIfAbsent()
            .subscribe();
    }

    private initFilmsDownloadingResultObserver(): void {
        merge(
            this.downloadingFilmsSocketService.onFilmDownloadStart$,
            this.downloadingFilmsSocketService.onFilmDownloadCancel$,
            this.downloadingFilmsSocketService.onFilmDownloadEnd$
        )
            .pipe(
                switchMap(() => this.downloadedFilmsService.updateAll()),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }
}

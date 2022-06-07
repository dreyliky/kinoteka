import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DownloadingFilmsService, DownloadingFilmsSocketService, FilmQueue } from '@features/film';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { FilmDownloadCancelBottomSheetComponent } from '../film-download-cancel-bottom-sheet';

@Component({
    selector: 'app-downloading-film-card',
    templateUrl: './downloading-film-card.component.html',
    styleUrls: ['./downloading-film-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadingFilmCardComponent implements OnInit, OnDestroy {
    @Input()
    public film!: FilmQueue;

    public get isDownloading(): boolean {
        return (this.downloadProgress > 0);
    }

    public downloadProgress: number = 0;

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly bottomSheet: MatBottomSheet,
        private readonly downloadedFilmsService: DownloadingFilmsService,
        private readonly downloadingFilmsProgressSocketService: DownloadingFilmsSocketService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.downloadProgress = this.film.downloadProgress;

        this.initFilmProgressObserver();
    }

    public ngOnDestroy(): void {
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
    }

    public onCancelButtonClick(film: FilmQueue): void {
        this.bottomSheet.open(FilmDownloadCancelBottomSheetComponent)
            .afterDismissed()
            .pipe(
                filter(Boolean),
                switchMap(() => this.downloadedFilmsService.cancel(film.data.kinopoiskId))
            )
            .subscribe();
    }

    private initFilmProgressObserver(): void {
        this.downloadingFilmsProgressSocketService.progress$
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter(({ kinopoiskId }) => (this.film.data.kinopoiskId === kinopoiskId))
            )
            .subscribe(({ downloadProgress }) => {
                this.downloadProgress = downloadProgress;

                this.changeDetector.detectChanges();
            });
    }
}

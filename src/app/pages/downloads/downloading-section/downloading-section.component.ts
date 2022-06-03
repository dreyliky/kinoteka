import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FilmQueue } from '@interfaces';
import { DownloadingFilmsService, DownloadingFilmsSocketService } from '@services';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-downloading-section',
    templateUrl: './downloading-section.component.html',
    styleUrls: ['./downloading-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadingSectionComponent implements OnInit, OnDestroy {
    public films: FilmQueue[] | null = null;

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly downloadedFilmsService: DownloadingFilmsService,
        private readonly downloadingFilmsSocketService: DownloadingFilmsSocketService,
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
            this.downloadingFilmsSocketService.onFilmDownloadCancel$,
            this.downloadingFilmsSocketService.onFilmDownloadEnd$
        )
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.updateFilms());
    }
}

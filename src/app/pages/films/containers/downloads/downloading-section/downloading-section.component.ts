import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { DownloadingFilmsService, DownloadingFilmsSocketService, FilmQueue } from '@features/film';
import { merge, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-downloading-section',
    templateUrl: './downloading-section.component.html',
    styleUrls: ['./downloading-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class DownloadingSectionComponent implements OnInit {
    public films: FilmQueue[] | null = null;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly downloadedFilmsService: DownloadingFilmsService,
        private readonly downloadingFilmsSocketService: DownloadingFilmsSocketService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.updateFilms();
        this.initFilmsDownloadingResultObserver();
    }

    private updateFilms(): void {
        this.films = null;

        this.downloadedFilmsService.getAll()
            .pipe(takeUntil(this.viewDestroyed$))
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

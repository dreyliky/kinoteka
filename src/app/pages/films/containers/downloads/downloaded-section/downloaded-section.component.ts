import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { DownloadedFilm, DownloadedFilmsService, DOWNLOADED_FILM_PREVIEW_LOADER, DownloadingFilmsSocketService, FilteredDownloadedFilmsService } from '@features/film';
import { ContentZoneService } from '@layouts';
import { merge, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DownloadedFilmPreviewLoaderService } from './downloaded-film-preview-loader.service';

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
    public filteredFilms$!: Observable<DownloadedFilm[]>;
    public allDownloadedFilms$!: Observable<DownloadedFilm[] | null>;

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly router: Router,
        private readonly contentZoneService: ContentZoneService,
        private readonly downloadingFilmsSocketService: DownloadingFilmsSocketService,
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly filteredDownloadedFilmsService: FilteredDownloadedFilmsService
    ) {}

    public ngOnInit(): void {
        this.filteredFilms$ = this.filteredDownloadedFilmsService.data$;
        this.allDownloadedFilms$ = this.downloadedFilmsService.data$;

        this.updateFilmsIfAbsent();
        this.initFilmsFiltersObserver();
        this.initFilmsDownloadingResultObserver();
    }

    public ngOnDestroy(): void {
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
    }

    public onFilmClick(film: DownloadedFilm): void {
        this.router.navigateByUrl(`/${AppRouteEnum.WatchDownloadedFilm}/${film.kinopoiskId}`);
    }

    private updateFilmsIfAbsent(): void {
        this.downloadedFilmsService.updateAllIfAbsent()
            .subscribe();
    }

    private initFilmsFiltersObserver(): void {
        this.filteredDownloadedFilmsService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.contentZoneService.scrollTop());
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

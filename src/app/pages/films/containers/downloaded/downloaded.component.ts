import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { DestroyService } from '@core/services';
import { DownloadedFilm, DownloadedFilmsService, DOWNLOADED_FILM_PREVIEW_LOADER, FilteredDownloadedFilmsService } from '@features/film';
import { DownloadingMediaSocketService, MediaTypeEnum } from '@features/media';
import { ContentZoneService, HeaderService } from '@layouts';
import { WatchRoutingEnum } from '@pages/watch/enums';
import { filter, merge, Observable, switchMap, takeUntil } from 'rxjs';
import { DownloadedFilmPreviewLoaderService } from './downloaded-film-preview-loader.service';
import { HeaderPortalContentComponent } from './header-portal-content';

@Component({
    selector: 'app-downloaded',
    templateUrl: './downloaded.component.html',
    styleUrls: ['./downloaded.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DOWNLOADED_FILM_PREVIEW_LOADER,
            useClass: DownloadedFilmPreviewLoaderService
        },
        DestroyService
    ]
})
export class DownloadedComponent implements OnInit, OnDestroy {
    public filteredFilms$!: Observable<DownloadedFilm[]>;
    public allDownloadedFilms$!: Observable<DownloadedFilm[] | null>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly router: Router,
        private readonly headerService: HeaderService,
        private readonly contentZoneService: ContentZoneService,
        private readonly downloadingMediaSocketService: DownloadingMediaSocketService,
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly filteredDownloadedFilmsService: FilteredDownloadedFilmsService,
    ) {}

    public ngOnInit(): void {
        this.filteredFilms$ = this.filteredDownloadedFilmsService.data$;
        this.allDownloadedFilms$ = this.downloadedFilmsService.data$;

        this.headerService.setPortalComponent(HeaderPortalContentComponent);
        this.updateFilmsIfAbsent();
        this.initFilmsFiltersObserver();
        this.initFilmsDownloadingResultObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
    }

    public onFilmClick(film: DownloadedFilm): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Watch}/${WatchRoutingEnum.DownloadedFilm}/${film.kinopoiskId}`);
    }

    private updateFilmsIfAbsent(): void {
        this.downloadedFilmsService.updateAllIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initFilmsFiltersObserver(): void {
        this.filteredDownloadedFilmsService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.contentZoneService.scrollTop());
    }

    private initFilmsDownloadingResultObserver(): void {
        merge(
            this.downloadingMediaSocketService.onMediaDownloadStart$,
            this.downloadingMediaSocketService.onMediaDownloadCancel$,
            this.downloadingMediaSocketService.onMediaDownloadEnd$
        )
            .pipe(
                filter(({ type }) => (type === MediaTypeEnum.Film)),
                switchMap(() => this.downloadedFilmsService.updateAll()),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }
}

import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { DestroyService } from '@core/services';
import { Film, OnlineFilmsFiltersService, OnlineFilmsService } from '@features/film';
import { VideoCdnResponse } from '@features/video-cdn';
import { ContentZoneService, HeaderService } from '@layouts';
import { merge, Observable, skip, takeUntil } from 'rxjs';
import { HeaderPortalContentComponent } from './header-portal-content';

@Component({
    selector: 'app-online',
    templateUrl: './online.component.html',
    styleUrls: ['./online.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class OnlineComponent implements OnInit {
    public filmsResponse$!: Observable<VideoCdnResponse<Film> | null>;

    private get viewDestroyedOrFiltersChanged$(): Observable<unknown> {
        return merge(
            this.viewDestroyed$,
            this.filmsFiltersService.data$
                .pipe(skip(1))
        )
    }

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly router: Router,
        private readonly contentZoneService: ContentZoneService,
        private readonly headerService: HeaderService,
        private readonly filmsService: OnlineFilmsService,
        private readonly filmsFiltersService: OnlineFilmsFiltersService
    ) {}

    public ngOnInit(): void {
        this.filmsResponse$ = this.filmsService.filmsResponse$;

        this.headerService.setPortalComponent(HeaderPortalContentComponent);
        this.updateFilmsIfAbsent();
        this.initFilmsFiltersObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
    }

    public onFilmClick(film: Film): void {
        this.router.navigateByUrl(`/${AppRouteEnum.WatchOnlineFilm}/${film.kinopoiskId}`);
    }

    private updateFilms(): void {
        this.filmsService.updateAllByFilters()
            .pipe(takeUntil(this.viewDestroyedOrFiltersChanged$))
            .subscribe(() => this.contentZoneService.scrollTop());
    }

    private updateFilmsIfAbsent(): void {
        this.filmsService.updateAllByFiltersIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initFilmsFiltersObserver(): void {
        this.filmsFiltersService.data$
            .pipe(
                skip(1),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.updateFilms());
    }
}

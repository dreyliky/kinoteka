import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { DestroyService } from '@core/services';
import { BookmarkedTvSeriesesService, OnlineTvSeriesFiltersService, OnlineTvSeriesService, TvSeries } from '@features/tv-series';
import { VideoCdnResponse } from '@features/video-cdn';
import { ContentZoneService, HeaderService } from '@layouts';
import { WatchRoutingEnum } from '@pages/watch/enums';
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
    public tvSeriesResponse$!: Observable<VideoCdnResponse<TvSeries> | null>;
    public bookmarkedTvSeriesesDictionary$!: Observable<BookmarkedMediaDictionary | null>;

    private get viewDestroyedOrFiltersChanged$(): Observable<unknown> {
        return merge(
            this.viewDestroyed$,
            this.tvSeriesFiltersService.data$
                .pipe(skip(1))
        )
    }

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly router: Router,
        private readonly contentZoneService: ContentZoneService,
        private readonly headerService: HeaderService,
        private readonly tvSeriesService: OnlineTvSeriesService,
        private readonly tvSeriesFiltersService: OnlineTvSeriesFiltersService,
        private readonly bookmarkedTvSeriesesService: BookmarkedTvSeriesesService
    ) {}

    public ngOnInit(): void {
        this.tvSeriesResponse$ = this.tvSeriesService.tvSeriesResponse$;
        this.bookmarkedTvSeriesesDictionary$ = this.bookmarkedTvSeriesesService.data$;

        this.headerService.setPortalComponent(HeaderPortalContentComponent);
        this.updateTvSeriesIfAbsent();
        this.initTvSeriesFiltersObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
    }

    public onTvSeriesClick(data: TvSeries): void {
        this.router.navigateByUrl(`${AppRouteEnum.Watch}/${WatchRoutingEnum.OnlineTvSeries}/${data.kinopoiskId}`);
    }

    private updateTvSerieses(): void {
        this.tvSeriesService.updateAllByFilters()
            .pipe(takeUntil(this.viewDestroyedOrFiltersChanged$))
            .subscribe(() => this.contentZoneService.scrollTop());
    }

    private updateTvSeriesIfAbsent(): void {
        this.tvSeriesService.updateAllByFiltersIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initTvSeriesFiltersObserver(): void {
        this.tvSeriesFiltersService.data$
            .pipe(
                skip(1),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.updateTvSerieses());
    }
}

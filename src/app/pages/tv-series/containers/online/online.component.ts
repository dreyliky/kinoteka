import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentZoneService } from '@core/services';
import { OnlineTvSeriesFiltersService, OnlineTvSeriesService, TvSeries } from '@features/tv-series';
import { VideoCdnResponse } from '@features/video-cdn';
import { HeaderService } from '@layouts';
import { merge, Observable, skip, Subject, takeUntil } from 'rxjs';
import { HeaderPortalContentComponent } from './header-portal-content';
import { TvSeriesDetailsWindowComponent } from './tv-series-details-window';

@Component({
    selector: 'app-online',
    templateUrl: './online.component.html',
    styleUrls: ['./online.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineComponent implements OnInit {
    public tvSeriesResponse$!: Observable<VideoCdnResponse<TvSeries> | null>;

    private get viewDestroyedOrFiltersChanged$(): Observable<unknown> {
        return merge(
            this.viewDestroyed$,
            this.tvSeriesFiltersService.data$
                .pipe(skip(1))
        )
    }

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly contentZoneService: ContentZoneService,
        private readonly headerService: HeaderService,
        private readonly dialogService: MatDialog,
        private readonly tvSeriesService: OnlineTvSeriesService,
        private readonly tvSeriesFiltersService: OnlineTvSeriesFiltersService
    ) {}

    public ngOnInit(): void {
        this.tvSeriesResponse$ = this.tvSeriesService.tvSeriesResponse$;

        this.headerService.setPortalComponent(HeaderPortalContentComponent);
        this.updateTvSeriesIfAbsent();
        this.initTvSeriesFiltersObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
    }

    public onTvSeriesClick(data: TvSeries): void {
        this.dialogService.open(TvSeriesDetailsWindowComponent, {
            width: '100%',
            minWidth: '100%',
            height: '100%',
            disableClose: true,
            panelClass: 'film-details-pane',
            autoFocus: true,
            data
        })
            .afterClosed()
            .subscribe();
    }

    private updateTvSerieses(): void {
        this.tvSeriesService.updateAllByFilters()
            .pipe(takeUntil(this.viewDestroyedOrFiltersChanged$))
            .subscribe(() => this.contentZoneService.scrollTop());
    }

    private updateTvSeriesIfAbsent(): void {
        this.tvSeriesService.updateAllByFiltersIfAbsent()
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

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum, CastTypeEnum } from '@core/enums';
import { OnlineTvSeriesService, TvSeries } from '@features/tv-series';
import { Observable } from 'rxjs';
import { OnlineTvSeriesDetailsRouteParamEnum as Param } from './enums';

@Component({
    selector: 'app-online-tv-series',
    templateUrl: './online-tv-series.component.html',
    styleUrls: ['../../styles/container-base.styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineTvSeriesComponent implements OnInit {
    public tvSeries$!: Observable<TvSeries>;

    public readonly castType = CastTypeEnum.OnlineTvSeries;

    private readonly openedTvSeriesKinopoiskId = this.activatedRoute.snapshot.paramMap
        .get(Param.KinopoiskId) as string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly onlineTvSeriesService: OnlineTvSeriesService
    ) {}

    public ngOnInit(): void {
        this.tvSeries$ = this.onlineTvSeriesService.get(this.openedTvSeriesKinopoiskId);
    }

    public onCloseButtonClick(): void {
        this.router.navigateByUrl(`/${AppRouteEnum.TvSeries}`);
    }
}

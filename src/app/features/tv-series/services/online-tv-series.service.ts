import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { VideoCdnResponse } from '@features/video-cdn';
import { Observable, tap } from 'rxjs';
import { TvSeries } from '../interfaces';
import { OnlineTvSeriesFiltersState, OnlineTvSeriesResponseState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineTvSeriesService {
    public get tvSeriesResponse$(): Observable<VideoCdnResponse<TvSeries> | null> {
        return this.tvSeriesResponseState.data$;
    }

    constructor(
        private readonly apiService: ApiService,
        private readonly tvSeriesResponseState: OnlineTvSeriesResponseState,
        private readonly filtersState: OnlineTvSeriesFiltersState
    ) {}

    public updateAllByFiltersIfAbsent(): Observable<VideoCdnResponse<TvSeries> | null> {
        if (!this.tvSeriesResponseState.data) {
            return this.updateAllByFilters();
        }

        return this.tvSeriesResponse$;
    }

    public updateAllByFilters(): Observable<VideoCdnResponse<TvSeries>> {
        this.tvSeriesResponseState.set(null);

        return this.apiService.get<VideoCdnResponse<TvSeries>>(
            `/tv-serieses`,
            { params: this.filtersState.data as any }
        )
            .pipe(
                tap((response) => this.tvSeriesResponseState.set(response))
            );
    }
}
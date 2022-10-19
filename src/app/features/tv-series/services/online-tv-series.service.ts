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
    public readonly tvSeriesResponse$ = this.tvSeriesResponseState.data$;

    constructor(
        private readonly apiService: ApiService,
        private readonly tvSeriesResponseState: OnlineTvSeriesResponseState,
        private readonly filtersState: OnlineTvSeriesFiltersState
    ) {}

    public get(kinopoiskId: string): Observable<TvSeries> {
        return this.apiService.get<TvSeries>(`/tv-serieses/${kinopoiskId}`);
    }

    public updateAllByFiltersIfAbsent(): Observable<VideoCdnResponse<TvSeries> | null> {
        if (!this.tvSeriesResponseState.data) {
            return this.updateAllByFilters();
        }

        return this.tvSeriesResponse$;
    }

    public updateAllByFilters(): Observable<VideoCdnResponse<TvSeries>> {
        this.tvSeriesResponseState.clear();

        return this.apiService.get<VideoCdnResponse<TvSeries>>(
            `/tv-serieses`,
            { params: this.filtersState.data as any }
        )
            .pipe(
                tap((response) => this.tvSeriesResponseState.set(response))
            );
    }
}

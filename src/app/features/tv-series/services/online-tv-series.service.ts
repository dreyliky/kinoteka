import { Injectable } from '@angular/core';
import { VideoCdnResponse } from '@features/video-cdn';
import { Observable, tap } from 'rxjs';
import { OnlineTvSeriesApi } from '../api';
import { TvSeries } from '../interfaces';
import { OnlineTvSeriesFiltersState, OnlineTvSeriesResponseState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineTvSeriesService {
    public readonly tvSeriesResponse$ = this.tvSeriesResponseState.data$;

    constructor(
        private readonly onlineTvSeriesApi: OnlineTvSeriesApi,
        private readonly tvSeriesResponseState: OnlineTvSeriesResponseState,
        private readonly filtersState: OnlineTvSeriesFiltersState
    ) {}

    public get(kinopoiskId: string): Observable<TvSeries> {
        return this.onlineTvSeriesApi.get(kinopoiskId);
    }

    public updateAllByFiltersIfAbsent(): Observable<VideoCdnResponse<TvSeries> | null> {
        if (!this.tvSeriesResponseState.data) {
            return this.updateAllByFilters();
        }

        return this.tvSeriesResponse$;
    }

    public updateAllByFilters(): Observable<VideoCdnResponse<TvSeries>> {
        this.tvSeriesResponseState.clear();

        return this.onlineTvSeriesApi.getAllByFilters(this.filtersState.data!)
            .pipe(
                tap((response) => this.tvSeriesResponseState.set(response))
            );
    }
}

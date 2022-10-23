import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { VideoCdnFilters, VideoCdnResponse } from '@features/video-cdn';
import { Observable } from 'rxjs';
import { TvSeries } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class OnlineTvSeriesApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public get(kinopoiskId: string): Observable<TvSeries> {
        return this.apiService.get<TvSeries>(`/tv-serieses/${kinopoiskId}`);
    }

    public getAllByFilters(filters: VideoCdnFilters): Observable<VideoCdnResponse<TvSeries>> {
        return this.apiService.get<VideoCdnResponse<TvSeries>>(
            `/tv-serieses`,
            { params: (filters as any) }
        );
    }
}

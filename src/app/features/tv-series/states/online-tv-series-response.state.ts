import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { VideoCdnResponse } from '../../video-cdn';
import { TvSeries } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class OnlineTvSeriesResponseState extends BaseState<VideoCdnResponse<TvSeries> | null> {}

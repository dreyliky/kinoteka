import { Injectable } from '@angular/core';
import { ObjectState } from 'ngx-base-state';
import { VideoCdnResponse } from '../../video-cdn';
import { TvSeries } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class OnlineTvSeriesResponseState extends ObjectState<VideoCdnResponse<TvSeries>> {}

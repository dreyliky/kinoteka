import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'ngx-base-state';
import { VideoCdnResponse } from '../../video-cdn';
import { TvSeries } from '../interfaces';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class OnlineTvSeriesResponseState extends ObjectState<VideoCdnResponse<TvSeries>> {}

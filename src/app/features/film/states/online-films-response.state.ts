import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { VideoCdnResponse } from '../../video-cdn';
import { Film } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsResponseState extends BaseState<VideoCdnResponse<Film> | null> {}

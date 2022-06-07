import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { DownloadedFilm } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsState extends BaseState<DownloadedFilm[] | null> {}

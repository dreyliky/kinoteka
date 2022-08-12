import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';

@Injectable({
    providedIn: 'root'
})
export class SelectedPlaylistCategory extends BaseState<number> {}

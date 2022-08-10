import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { PlaylistCategory } from '../../playlist';

@Injectable({
    providedIn: 'root'
})
export class PlaylistCategoriesState extends BaseState<PlaylistCategory[]> {}

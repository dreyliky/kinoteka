import { Injectable } from '@angular/core';
import { ArrayState } from 'ngx-base-state';
import { PlaylistCategory } from '../../playlist';

@Injectable({
    providedIn: 'root'
})
export class PlaylistCategoriesState extends ArrayState<PlaylistCategory> {}

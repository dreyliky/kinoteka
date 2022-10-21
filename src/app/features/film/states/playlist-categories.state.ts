import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';
import { PlaylistCategory } from '../../playlist';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class PlaylistCategoriesState extends ArrayState<PlaylistCategory> {}

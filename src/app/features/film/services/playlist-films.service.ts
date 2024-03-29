import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistFilmsApi } from '../api';
import { Film } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class PlaylistFilmsService {
    constructor(
        private readonly playlistFilmsApi: PlaylistFilmsApi
    ) {}

    public getAll(playlistId: number): Observable<Film[]> {
        return this.playlistFilmsApi.getAll(playlistId);
    }
}

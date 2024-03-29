import { Injectable } from '@angular/core';
import { Playlist } from '@features/playlist';
import { Observable } from 'rxjs';
import { FilmPlaylistsApi } from '../api';

@Injectable({
    providedIn: 'root'
})
export class FilmPlaylistsService {
    constructor(
        private readonly filmPlaylistsApi: FilmPlaylistsApi,
    ) {}

    public getAll(playlistCategoryId: number): Observable<Playlist[]> {
        return this.filmPlaylistsApi.getAll(playlistCategoryId);
    }

    public getById(id: number): Observable<Playlist> {
        return this.filmPlaylistsApi.getById(id);
    }
}

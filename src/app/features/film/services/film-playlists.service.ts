import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Playlist } from '@features/playlist';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilmPlaylistsService {
    constructor(
        private readonly apiService: ApiService,
    ) {}

    public getAll(playlistCategoryId: number): Observable<Playlist[]> {
        return this.apiService.get(`/film-playlists/category/${playlistCategoryId}`);
    }

    public getById(id: number): Observable<Playlist> {
        return this.apiService.get(`/film-playlists/${id}`);
    }
}

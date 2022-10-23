import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { PlaylistCategory } from '@features/playlist';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilmPlaylistCategoriesApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(): Observable<PlaylistCategory[]> {
        return this.apiService.get<PlaylistCategory[]>(`/film-playlist-categories`);
    }
}

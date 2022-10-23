import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { Film } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class PlaylistFilmsApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(playlistId: number): Observable<Film[]> {
        return this.apiService.get(`/playlist-films/${playlistId}`);
    }
}

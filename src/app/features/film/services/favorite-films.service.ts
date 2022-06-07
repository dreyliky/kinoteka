import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { Film } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class FavoriteFilmsService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(): Observable<Film[]> {
        return this.apiService.get<Film[]>(`/films/favorites`);
    }

    public getState(kinopoiskId: string): Observable<boolean> {
        return this.apiService.get<boolean>(`/films/favorites/${kinopoiskId}/state`);
    }

    public add(kinopoiskId: string): Observable<unknown> {
        return this.apiService.post(`/films/favorites/${kinopoiskId}`, {});
    }

    public remove(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/films/favorites/${kinopoiskId}`);
    }
}

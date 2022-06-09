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
        return this.apiService.get<Film[]>(`/favorites-films`);
    }

    public getState(kinopoiskId: string): Observable<boolean> {
        return this.apiService.get<boolean>(`/favorites-films/${kinopoiskId}/state`);
    }

    public add(kinopoiskId: string): Observable<unknown> {
        return this.apiService.post(`/favorites-films/${kinopoiskId}`, {});
    }

    public remove(kinopoiskId: string): Observable<unknown> {
        return this.apiService.delete(`/favorites-films/${kinopoiskId}`);
    }
}

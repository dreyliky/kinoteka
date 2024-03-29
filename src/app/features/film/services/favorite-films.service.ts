import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteFilmsApi } from '../api';
import { Film } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class FavoriteFilmsService {
    constructor(
        private readonly favoriteFilmsApi: FavoriteFilmsApi
    ) {}

    public getAll(): Observable<Film[]> {
        return this.favoriteFilmsApi.getAll();
    }

    public getState(kinopoiskId: string): Observable<boolean> {
        return this.favoriteFilmsApi.getState(kinopoiskId);
    }

    public add(kinopoiskId: string): Observable<unknown> {
        return this.favoriteFilmsApi.add(kinopoiskId);
    }

    public remove(kinopoiskId: string): Observable<unknown> {
        return this.favoriteFilmsApi.remove(kinopoiskId);
    }
}

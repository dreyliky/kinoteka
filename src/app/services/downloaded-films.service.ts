import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsService {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    public getAll(): Observable<Film[]> {
        return this.httpClient.get<Film[]>(`/films/downloaded`);
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        return this.httpClient.delete(`/films/downloaded/${kinopoiskId}`);
    }
}

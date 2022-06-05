import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmQueue } from '@interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloadingFilmsService {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    public getAll(): Observable<FilmQueue[]> {
        return this.httpClient.get<FilmQueue[]>(`/films/downloading`);
    }

    public cancel(kinopoiskId: string): Observable<unknown> {
        return this.httpClient.delete(`/films/downloading/${kinopoiskId}`);
    }
}

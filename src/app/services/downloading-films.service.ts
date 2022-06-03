import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmQueue } from '@interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DownloadingFilmsService {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    public getAll(): Observable<FilmQueue[]> {
        return this.httpClient.get<FilmQueue[]>(`${environment.backendHost}/films/downloading`);
    }

    public cancel(kinopoiskId: string): Observable<unknown> {
        return this.httpClient.delete(`${environment.backendHost}/films/downloading/${kinopoiskId}`);
    }
}

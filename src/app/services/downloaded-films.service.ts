import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsService {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    public getAll(): Observable<Film[]> {
        return this.httpClient.get<Film[]>(`${environment.backendHost}/films/downloaded`);
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        return this.httpClient.delete(`${environment.backendHost}/films/${kinopoiskId}/downloaded`);
    }
}

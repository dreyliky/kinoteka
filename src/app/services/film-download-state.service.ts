import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmDownloadStateEnum } from '@enums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FilmDownloadStateService {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    public check(kinopoiskId: string): Observable<FilmDownloadStateEnum> {
        return this.httpClient.get<FilmDownloadStateEnum>(`${environment.backendHost}/films/${kinopoiskId}/state`);
    }
}

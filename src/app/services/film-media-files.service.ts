import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmMediaFileMetadata } from '@interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilmMediaFilesService {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    public getAll(kinopoiskId: string): Observable<FilmMediaFileMetadata[]> {
        return this.httpClient.get<FilmMediaFileMetadata[]>(`/films/${kinopoiskId}/media-files`);
    }
}

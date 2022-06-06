import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { FilmMediaFileMetadata } from '@features/film';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilmMediaFilesService {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(kinopoiskId: string): Observable<FilmMediaFileMetadata[]> {
        return this.apiService.get<FilmMediaFileMetadata[]>(`/films/${kinopoiskId}/media-files`);
    }
}

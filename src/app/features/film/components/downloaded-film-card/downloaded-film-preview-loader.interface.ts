import { Observable } from 'rxjs';

export interface DownloadedFilmPreviewLoader {
    getPreview(kinopoiskId: string): Observable<unknown>;
}

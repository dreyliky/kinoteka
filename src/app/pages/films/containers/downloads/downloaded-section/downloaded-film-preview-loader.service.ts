import { Injectable } from '@angular/core';
import { ApiService, BlobService } from '@core/services';
import { DownloadedFilmPreviewLoader } from '@features/film';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class DownloadedFilmPreviewLoaderService implements DownloadedFilmPreviewLoader {
    constructor(
        private readonly apiService: ApiService,
        private readonly blobService: BlobService
    ) {}
    
    public getPreview(kinopoiskId: string): Observable<string> {
        return this.apiService.get<Blob>(
            `/films/downloaded/${kinopoiskId}/preview`,
            { responseType: ('blob' as any) }
        )
            .pipe(
                switchMap((blob) => this.blobService.toBase64(blob))
            );
    }
}

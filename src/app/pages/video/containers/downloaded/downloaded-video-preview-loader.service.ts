import { Injectable } from '@angular/core';
import { ApiService, BlobService } from '@core/services';
import { DownloadedVideoPreviewLoader } from '@features/video';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class DownloadedVideoPreviewLoaderService implements DownloadedVideoPreviewLoader {
    constructor(
        private readonly apiService: ApiService,
        private readonly blobService: BlobService
    ) {}
    
    public getPreview(kinopoiskId: string): Observable<string> {
        return this.apiService.get<Blob>(
            `/downloaded-videos/${kinopoiskId}/preview`,
            { responseType: ('blob' as any) }
        )
            .pipe(
                switchMap((blob) => this.blobService.toBase64(blob))
            );
    }
}

import { Observable } from 'rxjs';

export interface DownloadedVideoPreviewLoader {
    getPreview(id: string): Observable<unknown>;
}

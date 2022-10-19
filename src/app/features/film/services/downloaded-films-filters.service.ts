import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoCdnFilters } from '../../video-cdn';
import { DownloadedFilmsFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsFiltersService {
    public readonly data$ = (this.state.data$ as Observable<VideoCdnFilters>);
    public readonly data = (this.state.data as VideoCdnFilters);

    constructor(
        private readonly state: DownloadedFilmsFiltersState
    ) {}

    public update(filters: Partial<VideoCdnFilters>): void {
        this.state.updateWithPartial(filters);
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoCdnFilters } from '../../video-cdn';
import { DownloadedVideosFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosFiltersService {
    public readonly data$ = (this.state.data$ as Observable<VideoCdnFilters>);

    public get data(): VideoCdnFilters {
        return (this.state.data as VideoCdnFilters);
    }

    constructor(
        private readonly state: DownloadedVideosFiltersState
    ) {}

    public update(filters: Partial<VideoCdnFilters>): void {
        this.state.updateWithPartial(filters);
    }
}

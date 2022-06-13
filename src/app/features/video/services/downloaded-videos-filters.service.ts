import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoCdnFilters } from '../../video-cdn';
import { DownloadedVideosFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosFiltersService {
    public get data$(): Observable<VideoCdnFilters> {
        return (this.state.data$ as Observable<VideoCdnFilters>);
    }

    constructor(
        private readonly state: DownloadedVideosFiltersState
    ) {}

    public update(data: Partial<VideoCdnFilters>): void {
        const currentState = (this.state.data as VideoCdnFilters);

        this.state.set({ ...currentState, ...data });
    }
}

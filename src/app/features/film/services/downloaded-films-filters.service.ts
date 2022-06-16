import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoCdnFilters } from '../../video-cdn';
import { DownloadedFilmsFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsFiltersService {
    public get data$(): Observable<VideoCdnFilters> {
        return (this.state.data$ as Observable<VideoCdnFilters>);
    }

    public get data(): VideoCdnFilters {
        return (this.state.data as VideoCdnFilters);
    }

    constructor(
        private readonly state: DownloadedFilmsFiltersState
    ) {}

    public update(data: Partial<VideoCdnFilters>): void {
        const currentState = (this.state.data as VideoCdnFilters);

        this.state.set({ ...currentState, ...data });
    }
}

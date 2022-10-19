import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoCdnFilters } from '../../video-cdn';
import { OnlineTvSeriesFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineTvSeriesFiltersService {
    public readonly data$ = (this.state.data$ as Observable<VideoCdnFilters>);

    constructor(
        private readonly state: OnlineTvSeriesFiltersState
    ) {}

    public update(filters: Partial<VideoCdnFilters>): void {
        this.state.updateWithPartial(filters);
    }
}

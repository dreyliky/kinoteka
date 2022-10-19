import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoCdnFilters } from '../../video-cdn';
import { OnlineFilmsFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsFiltersService {
    public readonly data$ = (this.state.data$ as Observable<VideoCdnFilters>);

    constructor(
        private readonly state: OnlineFilmsFiltersState
    ) {}

    public update(filters: Partial<VideoCdnFilters>): void {
        this.state.updateWithPartial(filters);
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoCdnFilters } from '../../video-cdn';
import { OnlineFilmsFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsFiltersService {
    public get data$(): Observable<VideoCdnFilters> {
        return (this.state.data$ as Observable<VideoCdnFilters>);
    }

    constructor(
        private readonly state: OnlineFilmsFiltersState
    ) {}

    public update(data: Partial<VideoCdnFilters>): void {
        const currentState = (this.state.data as VideoCdnFilters);

        this.state.set({ ...currentState, ...data });
    }
}

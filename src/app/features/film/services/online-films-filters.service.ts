import { Injectable } from '@angular/core';
import { FilmsFilters } from '@features/film';
import { Observable } from 'rxjs';
import { OnlineFilmsFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsFiltersService {
    public get data$(): Observable<FilmsFilters> {
        return (this.state.data$ as Observable<FilmsFilters>);
    }

    constructor(
        private readonly state: OnlineFilmsFiltersState
    ) {}

    public update(data: Partial<FilmsFilters>): void {
        const currentState = (this.state.data as FilmsFilters);

        this.state.set({ ...currentState, ...data });
    }
}

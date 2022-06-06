import { Injectable } from '@angular/core';
import { FilmsFilters } from '@features/film';
import { Observable } from 'rxjs';
import { FilmsFiltersState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class FilmsFiltersService {
    public get data$(): Observable<FilmsFilters> {
        return (this.state.data$ as Observable<FilmsFilters>);
    }

    constructor(
        private readonly state: FilmsFiltersState
    ) {}

    public update(data: Partial<FilmsFilters>): void {
        const currentState = (this.state.data as FilmsFilters);

        this.state.set({ ...currentState, ...data });
    }
}

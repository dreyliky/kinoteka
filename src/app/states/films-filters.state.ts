import { Injectable } from '@angular/core';
import { BaseState } from '@core';
import { FilmsFilters } from '@interfaces';

@Injectable({
    providedIn: 'root'
})
export class FilmsFiltersState extends BaseState<FilmsFilters> {
    constructor() {
        super({
            query: '',
            year: '',
            page: '1',
            limit: '50'
        });
    }
}

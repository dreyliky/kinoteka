import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { FilmsFilters } from '@features/film';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsFiltersState extends BaseState<FilmsFilters> {
    constructor() {
        super({
            query: '',
            year: '',
            page: '1',
            limit: '30'
        });
    }
}

import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { VideoCdnFilters } from '../../video-cdn';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsFiltersState extends BaseState<VideoCdnFilters> {
    constructor() {
        super({
            query: '',
            year: '',
            page: '1',
            limit: '30'
        });
    }
}

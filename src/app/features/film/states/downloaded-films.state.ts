import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { DownloadedFilm } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsState extends BaseState<DownloadedFilm[] | null> {
    public deleteByKinopoiskId(kinopoiskId: string): void {
        if (this.data) {
            const filteredFilms = this.data
                .filter((film) => (film.kinopoiskId !== kinopoiskId));
            
            this.set(filteredFilms);
        }
    }
}

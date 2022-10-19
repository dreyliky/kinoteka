import { Injectable } from '@angular/core';
import { ArrayState } from 'ngx-base-state';
import { DownloadedFilm } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsState extends ArrayState<DownloadedFilm> {
    protected override getItemId(film: DownloadedFilm): string {
        return film.kinopoiskId;
    }
}

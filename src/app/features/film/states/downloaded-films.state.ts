import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';
import { DownloadedFilm } from '../interfaces';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsState extends ArrayState<DownloadedFilm> {
    protected override getItemId(film: DownloadedFilm): string {
        return film.kinopoiskId;
    }
}

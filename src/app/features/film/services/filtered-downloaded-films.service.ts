import { Injectable } from '@angular/core';
import { VideoCdnFilters } from '@features/video-cdn';
import { combineLatest, map, Observable } from 'rxjs';
import { DownloadedFilm } from '../interfaces';
import { DownloadedFilmsFiltersState, DownloadedFilmsState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class FilteredDownloadedFilmsService {
    public get data$(): Observable<DownloadedFilm[]> {
        return combineLatest([
            this.downloadedFilmsFiltersState.data$,
            this.downloadedFilmsState.data$
        ])
            .pipe(
                map(([filters, films]) => this.filterFilms(filters, films))
            );
    }

    constructor(
        private readonly downloadedFilmsFiltersState: DownloadedFilmsFiltersState,
        private readonly downloadedFilmsState: DownloadedFilmsState
    ) {}

    private filterFilms(filters: VideoCdnFilters | null, films: DownloadedFilm[] | null): DownloadedFilm[] {
        const searchString = filters?.query.toLowerCase() ?? '';
        const year = filters?.year ?? '';

        return films?.filter((film) => (
            this.filterFilmBySearch(searchString, film) &&
            this.filterFilmByYear(year, film)
        )) ?? [];
    }

    private filterFilmBySearch(searchString: string, film: DownloadedFilm): boolean {
        if (searchString) {
            return film.title
                .toLowerCase()
                .includes(searchString);
        }

        return true;
    }

    private filterFilmByYear(year: string, film: DownloadedFilm): boolean {
        if (year) {
            const filmYear = new Date(film.year)
                .getFullYear()
                .toString();

            return (filmYear === year);
        }

        return true;
    }
}

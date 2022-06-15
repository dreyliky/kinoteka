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
                map(([filters, films]) => this.filterFilms(filters as VideoCdnFilters, films))
            );
    }

    constructor(
        private readonly downloadedFilmsFiltersState: DownloadedFilmsFiltersState,
        private readonly downloadedFilmsState: DownloadedFilmsState
    ) {}

    private filterFilms(filters: VideoCdnFilters, films: DownloadedFilm[] | null): DownloadedFilm[] {
        const searchString = filters.query.toLowerCase();
        const year = filters.year;
        const page = (+filters.page - 1);
        const limit = +filters.limit;
        const sliceFrom = (page * limit);
        const sliceTo = (sliceFrom + limit);

        return films
            ?.filter((film) => (
                this.filterFilmBySearch(searchString, film) &&
                this.filterFilmByYear(year, film)
            ))
            .slice(sliceFrom, sliceTo) ?? [];
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

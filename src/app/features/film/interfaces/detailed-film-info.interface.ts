import { Film } from './film.interface';

export interface DetailedFilmInfo extends Film {
    readonly description: string;
    readonly posterUrl: string;
    readonly backdropUrl: string;
    readonly kinopoiskRating: number;
    readonly imdbRating: number;
    readonly genres: string[];
    readonly countries: string[];
    readonly ageRating: number;
}

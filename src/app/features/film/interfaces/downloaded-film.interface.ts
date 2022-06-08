import { FilmMedia } from './film-media.interface';

export interface DownloadedFilm {
    readonly title: string;
    readonly kinopoiskId: string;
    readonly year: string;
    readonly media: FilmMedia;
}

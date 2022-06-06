import { Film } from './film.interface';

export interface FilmQueue {
    readonly data: Film;
    readonly isDownloading: boolean;
    readonly downloadProgress: number;
}

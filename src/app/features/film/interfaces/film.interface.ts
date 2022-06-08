import { FilmMedia } from './film-media.interface';

export interface Film {
    readonly title: string;
    readonly kinopoiskId: string;
    readonly translation: string;
    readonly year: string;
    readonly iframeSrc: string;
    readonly previewUrl: string;
    readonly media: FilmMedia[];
}

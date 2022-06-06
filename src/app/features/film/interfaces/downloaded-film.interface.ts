import { FilmMediaFileMetadata } from './film-media-file-metadata.interface';

export interface DownloadedFilm {
    readonly title: string;
    readonly kinopoiskId: string;
    readonly year: string;
    readonly media: FilmMediaFileMetadata;
}

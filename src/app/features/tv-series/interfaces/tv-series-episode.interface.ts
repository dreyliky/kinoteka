import { TvSeriesEpisodeMedia } from './tv-series-episode-media.interface';

export interface TvSeriesEpisode {
    readonly title: string;
    readonly num: string;
    readonly seasonNum: number;
    readonly releaseDate: string;
    readonly duration: number;
    readonly media: TvSeriesEpisodeMedia[];
}

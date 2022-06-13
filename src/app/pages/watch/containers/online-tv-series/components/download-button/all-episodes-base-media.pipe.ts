import { Pipe, PipeTransform } from '@angular/core';
import { TvSeriesEpisode } from '@features/tv-series';

interface AllEpisodesBaseMedia {
    readonly translationId: number;
    readonly translationName: string;
    readonly maxQuality: number;
}

@Pipe({
    name: 'allEpisodesBaseMedia'
})
export class AllEpisodesBaseMediaPipe implements PipeTransform {
    public transform(seasonNum: number, episodesMap: Map<number, TvSeriesEpisode[]>): AllEpisodesBaseMedia[] {
        const episodes = episodesMap.get(seasonNum) as TvSeriesEpisode[];
        const baseMediaArray: AllEpisodesBaseMedia[] = [];

        episodes[0].media.forEach((firstEpisodeMedia) => {
            const isTranslationExistInEachEpisode = episodes
                .slice(1)
                .map((episode) => episode.media)
                .every((mediaArray) => mediaArray.some((media) => (media.translationId === firstEpisodeMedia.translationId)));

            if (isTranslationExistInEachEpisode) {
                baseMediaArray.push({
                    translationId: firstEpisodeMedia.translationId,
                    translationName: firstEpisodeMedia.translationName,
                    maxQuality: firstEpisodeMedia.maxQuality
                });
            }
        });

        return baseMediaArray;
    }
}

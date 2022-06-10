import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TvSeries, TvSeriesEpisode } from '@features/tv-series';

@Component({
    selector: 'app-download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadButtonComponent implements OnInit {
    @Input()
    public tvSeries!: TvSeries;

    public seasons!: number[];
    /** Key - season number */
    public episodesMap = new Map<number, TvSeriesEpisode[]>();

    public ngOnInit(): void {
        this.initSeasonsArray();
        this.initEpisodesMap();
    }

    private initSeasonsArray(): void {
        this.seasons = new Array(this.tvSeries.seasonCount)
            .fill(1)
            .map((_, index) => (index + 1));
    }

    private initEpisodesMap(): void {
        this.tvSeries.episodes
            .forEach((episode) => {
                const episodesOfSeason = this.episodesMap.get(episode.seasonNum) ?? [];

                episodesOfSeason.push(episode);
                this.episodesMap.set(episode.seasonNum, episodesOfSeason);
            });
    }
}

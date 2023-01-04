import { Injectable } from '@angular/core';
import { VideoCdnFilters } from '@features/video-cdn';
import { combineLatest, map, shareReplay } from 'rxjs';
import { DownloadedVideo } from '../interfaces';
import { DownloadedVideosFiltersState, DownloadedVideosState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class FilteredDownloadedVideosService {
    public readonly data$ = combineLatest([
        this.downloadedVideosFiltersState.data$,
        this.downloadedVideosState.data$
    ])
        .pipe(
            map(([filters, videos]) => this.filterFilms(filters as VideoCdnFilters, videos)),
            shareReplay(1)
        );

    constructor(
        private readonly downloadedVideosFiltersState: DownloadedVideosFiltersState,
        private readonly downloadedVideosState: DownloadedVideosState
    ) {}

    private filterFilms(filters: VideoCdnFilters, videos: DownloadedVideo[] | null): DownloadedVideo[] {
        const searchString = filters.query.toLowerCase();
        const page = (+filters.page - 1);
        const limit = +filters.limit;
        const sliceFrom = (page * limit);
        const sliceTo = (sliceFrom + limit);

        return videos
            ?.filter((video) => this.filterFilmBySearch(searchString, video))
            .slice(sliceFrom, sliceTo) ?? [];
    }

    private filterFilmBySearch(searchString: string, video: DownloadedVideo): boolean {
        if (searchString) {
            return `${video.title} ${video.authorName}`
                .toLowerCase()
                .includes(searchString);
        }

        return true;
    }
}

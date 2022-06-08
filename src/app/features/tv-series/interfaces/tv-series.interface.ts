export interface TvSeries {
    readonly title: string;
    readonly kinopoiskId: string;
    readonly seasonCount: number;
    readonly episodeCount: number;
    readonly startDate: string;
    readonly endDate: string | null;
    readonly previewUrl: string;
    readonly iframeSrc: string;
}

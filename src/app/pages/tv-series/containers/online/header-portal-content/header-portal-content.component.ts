import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OnlineTvSeriesFiltersService } from '@features/tv-series';
import { VideoCdnFilters } from '@features/video-cdn';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header-portal-content',
    templateUrl: './header-portal-content.component.html',
    styleUrls: ['./header-portal-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderPortalContentComponent implements OnInit {
    public filters$!: Observable<VideoCdnFilters>;

    constructor(
        private readonly tvSeriesFiltersService: OnlineTvSeriesFiltersService
    ) {}

    public ngOnInit(): void {
        this.filters$ = this.tvSeriesFiltersService.data$;
    }

    public onSearchChange(query: string): void {
        this.tvSeriesFiltersService.update({ query, page: '1' });
    }

    public onYearSelected(year: number): void {
        this.tvSeriesFiltersService.update({ year: year.toString(), page: '1' });
    }

    public onClearYearDeselected(): void {
        this.tvSeriesFiltersService.update({ year: '', page: '1' });
    }
}

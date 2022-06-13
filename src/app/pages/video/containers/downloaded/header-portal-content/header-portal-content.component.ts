import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DownloadedVideosFiltersService } from '@features/video';
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
        private readonly videosFiltersService: DownloadedVideosFiltersService
    ) {}

    public ngOnInit(): void {
        this.filters$ = this.videosFiltersService.data$;
    }

    public onSearchChange(query: string): void {
        this.videosFiltersService.update({ query, page: '1' });
    }
}

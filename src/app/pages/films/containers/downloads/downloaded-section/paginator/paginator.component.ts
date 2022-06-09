import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DownloadedFilm, DownloadedFilmsFiltersService, DownloadedFilmsService } from '@features/film';
import { VideoCdnFilters } from '@features/video-cdn';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {
    public allDownloadedFilms$!: Observable<DownloadedFilm[] | null>;
    public filters$!: Observable<VideoCdnFilters>;

    public currentPageIndex = 0;

    constructor(
        private readonly filtersService: DownloadedFilmsFiltersService,
        private readonly downloadedFilmsService: DownloadedFilmsService
    ) {}

    public ngOnInit(): void {
        this.allDownloadedFilms$ = this.downloadedFilmsService.data$;
        this.filters$ = this.filtersService.data$;
    }

    public onPaginatorPageEvent(event: PageEvent): void {
        this.filtersService.update({
            limit: event.pageSize.toString(),
            page: (event.pageIndex + 1).toString(),
        });
    }
}

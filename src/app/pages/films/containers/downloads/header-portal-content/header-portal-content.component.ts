import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DownloadedFilmsFiltersService, FilmsFilters } from '@features/film';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header-portal-content',
    templateUrl: './header-portal-content.component.html',
    styleUrls: ['./header-portal-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderPortalContentComponent implements OnInit {
    public filters$!: Observable<FilmsFilters>;

    constructor(
        private readonly filmsFiltersService: DownloadedFilmsFiltersService
    ) {}

    public ngOnInit(): void {
        this.filters$ = this.filmsFiltersService.data$;
    }

    public onSearchChange(query: string): void {
        this.filmsFiltersService.update({ query, page: '1' });
    }

    public onYearSelected(year: number): void {
        this.filmsFiltersService.update({ year: year.toString(), page: '1' });
    }

    public onClearYearDeselected(): void {
        this.filmsFiltersService.update({ year: '', page: '1' });
    }
}

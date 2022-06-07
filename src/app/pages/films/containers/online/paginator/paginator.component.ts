import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FilmsFilters, FilmsResponse, OnlineFilmsFiltersService } from '@features/film';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {
    @Input()
    public filmsResponse!: FilmsResponse;

    public filters$!: Observable<FilmsFilters>;

    constructor(
        private readonly filtersService: OnlineFilmsFiltersService
    ) {}

    public ngOnInit(): void {
        this.filters$ = this.filtersService.data$;
    }

    public onPaginatorPageEvent(event: PageEvent): void {
        this.filtersService.update({
            limit: event.pageSize.toString(),
            page: (event.pageIndex + 1).toString(),
        });
    }
}

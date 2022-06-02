import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FilmsFilters, FilmsResponse } from '@interfaces';
import { FilmsFiltersService } from '@services';
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

    @Output()
    public changes = new EventEmitter<PageEvent>();

    public filters$!: Observable<FilmsFilters>;

    constructor(
        private readonly filtersService: FilmsFiltersService
    ) {}

    public ngOnInit(): void {
        this.filters$ = this.filtersService.data$;
    }

    public onPaginatorPageEvent(event: PageEvent): void {
        this.filtersService.update({
            limit: event.pageSize.toString(),
            page: (event.pageIndex + 1).toString(),
        });
        this.changes.emit(event);
    }
}

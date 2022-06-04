import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilmsFilters } from '@interfaces';
import { FilmsFiltersService } from '@services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
    @Output()
    public changes = new EventEmitter();

    public filters$!: Observable<FilmsFilters>;

    constructor(
        private readonly filtersService: FilmsFiltersService
    ) {}

    public ngOnInit(): void {
        this.filters$ = this.filtersService.data$;
    }

    public onSearchChange(event: Event): void {
        const input = event.target as HTMLInputElement;

        this.filtersService.update({ query: input.value, page: '1' });
        this.changes.emit();
    }

    public onYearChange(event: Event): void {
        const input = event.target as HTMLInputElement;

        this.filtersService.update({ year: input.value.toString(), page: '1' });
        this.changes.emit();
    }
}

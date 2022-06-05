import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
    @Input()
    public placeholder: string = 'Пошук';

    @Input()
    public value: string = '';

    @Output()
    public readonly searchChange = new EventEmitter<string>();

    @ViewChild('searchInput')
    private readonly searchRef!: ElementRef<HTMLInputElement>;

    public onSearchInputChange(): void {
        this.searchChange.emit(this.searchRef.nativeElement.value);
    }

    public onSearchButtonClick(): void {
        this.searchChange.emit(this.searchRef.nativeElement.value);
    }
}

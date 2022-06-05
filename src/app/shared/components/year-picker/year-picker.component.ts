import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
    selector: 'app-year-picker',
    templateUrl: './year-picker.component.html',
    styleUrls: ['./year-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearPickerComponent {
    @Input()
    public data: number | null = null;

    @Input()
    public minDate: Date = new Date(1895, 0, 1);

    @Input()
    public maxDate: Date = new Date();

    @Output()
    public yearSelected = new EventEmitter<number>();

    @Output()
    public yearDeselected = new EventEmitter<unknown>();

    @ViewChild(MatDatepicker)
    private readonly datePicker!: MatDatepicker<unknown>;

    public onYearSelected(date: Date): void {
        this.data = date.getFullYear();
        this.datePicker.close();
        this.yearSelected.emit(this.data);
    }

    public onClearYearButtonClick(): void {
        this.data = null;
        this.yearDeselected.emit();
    }
}

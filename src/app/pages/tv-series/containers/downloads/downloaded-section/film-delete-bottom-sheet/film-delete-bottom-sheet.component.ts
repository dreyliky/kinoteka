import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-film-delete-bottom-sheet',
    templateUrl: './film-delete-bottom-sheet.component.html',
    styleUrls: ['./film-delete-bottom-sheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDeleteBottomSheetComponent {
    constructor(
        private readonly bottomSheet: MatBottomSheetRef
    ) {}
    
    public onDeleteButtonClick(): void {
        this.bottomSheet.dismiss(true);
    }

    public onCancelButtonClick(): void {
        this.bottomSheet.dismiss(false);
    }
}

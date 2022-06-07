import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-film-download-cancel-bottom-sheet',
    templateUrl: './film-download-cancel-bottom-sheet.component.html',
    styleUrls: ['./film-download-cancel-bottom-sheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDownloadCancelBottomSheetComponent {
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

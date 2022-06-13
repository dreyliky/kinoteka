import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-video-delete-bottom-sheet',
    templateUrl: './video-delete-bottom-sheet.component.html',
    styleUrls: ['./video-delete-bottom-sheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoDeleteBottomSheetComponent {
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

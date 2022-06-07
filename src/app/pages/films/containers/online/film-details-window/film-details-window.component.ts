import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Film } from '@features/film';

@Component({
    selector: 'app-film-details-window',
    templateUrl: './film-details-window.component.html',
    styleUrls: ['./film-details-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDetailsWindowComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: Film,
        private readonly dialog: MatDialogRef<Film>,
    ) {}

    public onCloseButtonClick(): void {
        this.dialog.close();
    }
}

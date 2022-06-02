import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Film } from '@interfaces';
import { DownloadedFilmsService } from '@services';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-film-details-window',
    templateUrl: './film-details-window.component.html',
    styleUrls: ['./film-details-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDetailsWindowComponent {
    public get filmUrl(): string {
        return `${environment.backendHost}/films/${this.data.kinopoiskId}/downloaded`;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: Film,
        private readonly snackBar: MatSnackBar,
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly dialog: MatDialogRef<Film>
    ) {}

    public onCloseButtonClick(): void {
        this.dialog.close();
    }

    public onDeleteButtonClick(): void {
        this.dialog.close(true);
        this.snackBar.open('Фільм видалений.', 'Закрити', { duration: 5000 })
        this.downloadedFilmsService.delete(this.data.kinopoiskId)
            .subscribe();
    }
}

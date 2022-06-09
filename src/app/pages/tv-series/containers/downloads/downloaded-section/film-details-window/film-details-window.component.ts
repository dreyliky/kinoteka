import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DownloadedFilm, DownloadedFilmsService, Film } from '@features/film';
import { delayWhen, filter, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FilmDeleteBottomSheetComponent } from '../film-delete-bottom-sheet';

@Component({
    selector: 'app-film-details-window',
    templateUrl: './film-details-window.component.html',
    styleUrls: ['./film-details-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDetailsWindowComponent {
    public get filmUrl(): string {
        // FIXME: Make via service
        return `${environment.backendHost}/downloaded-films/${this.data.kinopoiskId}`;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: DownloadedFilm,
        private readonly snackBar: MatSnackBar,
        private readonly bottomSheet: MatBottomSheet,
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly dialog: MatDialogRef<Film>
    ) {}

    public onCloseButtonClick(): void {
        this.dialog.close();
    }

    public onDeleteButtonClick(): void {
        this.bottomSheet.open(FilmDeleteBottomSheetComponent)
            .afterDismissed()
            .pipe(
                filter(Boolean),
                tap(() => this.dialog.close(true)),
                tap(() => this.snackBar.open('Фільм видалений.', 'Закрити', { duration: 3000 })),
                delayWhen(() => this.downloadedFilmsService.delete(this.data.kinopoiskId))
            )
            .subscribe();
    }
}

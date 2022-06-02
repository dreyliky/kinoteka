import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Film } from '@interfaces';
import { DownloadedFilmsService } from '@services';
import { filter } from 'rxjs/operators';
import { FilmDetailsWindowComponent } from './film-details-window';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadsComponent implements OnInit {
    public films: Film[] | null = null;

    constructor(
        private readonly dialogService: MatDialog,
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.updateFilms();
    }

    public onFilmClick(data: Film): void {
        this.dialogService.open(FilmDetailsWindowComponent, {
            width: '100%',
            minWidth: '100%',
            height: '100%',
            disableClose: true,
            panelClass: 'film-details-pane',
            autoFocus: true,
            data
        })
            .afterClosed()
            .pipe(filter(Boolean))
            .subscribe(() => this.updateFilms());
    }

    private updateFilms(): void {
        this.films = null;

        this.downloadedFilmsService.getAll()
            .subscribe((films) => {
                this.films = films;

                this.changeDetector.detectChanges();
            })
    }
}

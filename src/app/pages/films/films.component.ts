import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Film, FilmsResponse } from '@interfaces';
import { FilmsService } from '@services';
import { Observable, take } from 'rxjs';
import { FilmDetailsWindowComponent } from './film-details-window';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsComponent implements OnInit {
    public filmsResponse$!: Observable<FilmsResponse | null>;

    constructor(
        private readonly dialogService: MatDialog,
        private readonly filmsService: FilmsService
    ) {}

    public ngOnInit(): void {
        this.filmsResponse$ = this.filmsService.filmsResponse$;

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
            .subscribe();
    }

    public updateFilms(): void {
        this.filmsService.updateAllByFilters()
            .pipe(take(1))
            .subscribe();
    }
}

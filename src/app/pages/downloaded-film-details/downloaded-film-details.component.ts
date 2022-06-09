import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { DownloadedFilm, DownloadedFilmsService } from '@features/film';
import { delayWhen, filter, Observable, tap } from 'rxjs';
import { FilmsRoutingEnum } from '../films/enums';
import { FilmDeleteBottomSheetComponent } from './components';
import { DownloadedFilmDetailsRouteParamEnum as Param } from './enums';

@Component({
    selector: 'app-downloaded-film-details',
    templateUrl: './downloaded-film-details.component.html',
    styleUrls: ['./downloaded-film-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadedFilmDetailsComponent implements OnInit {
    public filmUrl!: string;
    public film$!: Observable<DownloadedFilm>;

    private readonly openedFilmKinopoiskId = this.activatedRoute.snapshot.paramMap
        .get(Param.KinopoiskId) as string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly snackBar: MatSnackBar,
        private readonly bottomSheet: MatBottomSheet,
        private readonly downloadedFilmsService: DownloadedFilmsService,
    ) {}

    public ngOnInit(): void {
        this.filmUrl = this.downloadedFilmsService.getMediaUrl(this.openedFilmKinopoiskId);
        this.film$ = this.downloadedFilmsService.get(this.openedFilmKinopoiskId);
    }

    public onCloseButtonClick(): void {
        this.openDownloadedFilmsPage();
    }

    public onDeleteButtonClick(film: DownloadedFilm): void {
        this.bottomSheet.open(FilmDeleteBottomSheetComponent)
            .afterDismissed()
            .pipe(
                filter(Boolean),
                tap(() => this.openDownloadedFilmsPage()),
                tap(() => this.snackBar.open('Фільм видалений.', 'Закрити', { duration: 3000 })),
                delayWhen(() => this.downloadedFilmsService.delete(film.kinopoiskId))
            )
            .subscribe();
    }

    private openDownloadedFilmsPage(): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Films}/${FilmsRoutingEnum.Downloads}`);
    }
}

import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum, CastTypeEnum } from '@core/enums';
import { DestroyService, ToastService } from '@core/services';
import { DownloadedFilm, DownloadedFilmsService } from '@features/film';
import { FilmsRoutingEnum } from '@pages/films/enums';
import { delayWhen, filter, Observable, takeUntil, tap } from 'rxjs';
import { FilmDeleteBottomSheetComponent } from './components';
import { DownloadedFilmDetailsRouteParamEnum as Param } from './enums';

@Component({
    selector: 'app-downloaded-film',
    templateUrl: './downloaded-film.component.html',
    styleUrls: ['../../styles/container-base.styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class DownloadedFilmComponent implements OnInit {
    public filmUrl!: string;
    public film$!: Observable<DownloadedFilm>;

    public readonly castType = CastTypeEnum.DownloadedFilm;

    private readonly openedFilmKinopoiskId = this.activatedRoute.snapshot.paramMap
        .get(Param.KinopoiskId) as string;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly toastService: ToastService,
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
                delayWhen(() => this.downloadedFilmsService.delete(film.kinopoiskId)),
                tap(() => this.toastService.open('Фільм видалений.')),
                tap(() => this.openDownloadedFilmsPage()),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }

    private openDownloadedFilmsPage(): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Films}/${FilmsRoutingEnum.Downloaded}`);
    }
}

import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum, CastTypeEnum } from '@core/enums';
import { DestroyService } from '@core/services';
import { Film, OnlineFilmsService } from '@features/film';
import { catchError, Observable, takeUntil, tap } from 'rxjs';
import { OnlineFilmDetailsRouteParamEnum as Param, SectionEnum } from './enums';
import { OpenedFilmState, SectionState } from './states';

@Component({
    selector: 'app-online-film',
    templateUrl: './online-film.component.html',
    styleUrls: ['../../styles/container-base.styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService,
        OpenedFilmState,
        SectionState
    ]
})
export class OnlineFilmComponent implements OnInit {
    public film$!: Observable<Film | null>;
    public readonly castType = CastTypeEnum.OnlineFilm;

    private readonly openedFilmKinopoiskId = this.activatedRoute.snapshot.paramMap
        .get(Param.KinopoiskId) as string;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly filmsService: OnlineFilmsService,
        private readonly openedFilmState: OpenedFilmState,
        private readonly sectionState: SectionState
    ) {}

    public ngOnInit(): void {
        this.film$ = this.openedFilmState.data$;

        this.initOpenedFilmObserver();
    }

    public onCloseButtonClick(): void {
        if (!this.document.referrer) {
            this.router.navigateByUrl(`/${AppRouteEnum.Films}`);
        } else {
            history.back();
        }
    }

    private initOpenedFilmObserver(): void {
        this.filmsService.getDetailedInfo(this.openedFilmKinopoiskId)
            .pipe(
                catchError(() => this.filmsService.get(this.openedFilmKinopoiskId).pipe(
                    tap(() => this.sectionState.set(SectionEnum.Player))
                )),
                tap((film) => this.openedFilmState.set(film)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe();
    }
}

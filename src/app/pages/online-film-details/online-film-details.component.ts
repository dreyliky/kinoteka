import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum, CastTypeEnum } from '@core/enums';
import { Film, OnlineFilmsService } from '@features/film';
import { Observable } from 'rxjs';
import { OnlineFilmDetailsRouteParamEnum as Param } from './enums';

@Component({
    selector: 'app-online-film-details',
    templateUrl: './online-film-details.component.html',
    styleUrls: ['./online-film-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineFilmDetailsComponent implements OnInit {
    public film$!: Observable<Film>;
    
    public readonly castType = CastTypeEnum.OnlineFilm;
    
    private readonly openedFilmKinopoiskId = this.activatedRoute.snapshot.paramMap
        .get(Param.KinopoiskId) as string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly filmsService: OnlineFilmsService
    ) {}

    public ngOnInit(): void {
        this.film$ = this.filmsService.get(this.openedFilmKinopoiskId);
    }

    public onCloseButtonClick(): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Films}`);
    }
}

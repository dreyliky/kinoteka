import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BookmarkedFilmsService, FavoriteFilmsService, Film } from '@features/film';
import { WatchRoutingEnum } from '@pages/watch/enums';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
    public films$!: Observable<Film[]>;

    public bookmarkedFilmsDictionary$!: Observable<BookmarkedMediaDictionary | null>;

    constructor(
        private readonly router: Router,
        private readonly bookmarkedFilmsService: BookmarkedFilmsService,
        private readonly favoriteFilmsService: FavoriteFilmsService
    ) {}

    public ngOnInit(): void {
        this.bookmarkedFilmsDictionary$ = this.bookmarkedFilmsService.data$;
        this.films$ = this.favoriteFilmsService.getAll();
    }

    public onFilmClick(film: Film): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Watch}/${WatchRoutingEnum.OnlineFilm}/${film.kinopoiskId}`);
    }
}

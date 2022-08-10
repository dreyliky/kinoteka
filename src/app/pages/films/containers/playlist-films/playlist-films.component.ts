import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BookmarkedFilmsService, Film, PlaylistFilmsService } from '@features/film';
import { HeaderService } from '@layouts';
import { WatchRoutingEnum } from '@pages/watch/enums';
import { Observable } from 'rxjs';
import { HeaderPortalContentComponent } from './components';
import { PlaylistFilmsParamEnum } from './enums';

@Component({
    selector: 'app-playlist-films',
    templateUrl: './playlist-films.component.html',
    styleUrls: ['./playlist-films.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistFilmsComponent implements OnInit, OnDestroy {
    public films$!: Observable<Film[] | null>;
    public bookmarkedFilmsDictionary$!: Observable<BookmarkedMediaDictionary | null>;

    constructor(
        private readonly injector: Injector,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly headerService: HeaderService,
        private readonly playlistFilmsService: PlaylistFilmsService,
        private readonly bookmarkedFilmsService: BookmarkedFilmsService
    ) {}

    public ngOnInit(): void {
        const playlistId = +this.activatedRoute.snapshot.params[PlaylistFilmsParamEnum.PlaylistId];
        this.films$ = this.playlistFilmsService.getAll(playlistId);
        this.bookmarkedFilmsDictionary$ = this.bookmarkedFilmsService.data$;

        this.headerService.setPortalComponent(HeaderPortalContentComponent, this.injector);
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
    }

    public onFilmClick(film: Film): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Watch}/${WatchRoutingEnum.OnlineFilm}/${film.kinopoiskId}`);
    }
}

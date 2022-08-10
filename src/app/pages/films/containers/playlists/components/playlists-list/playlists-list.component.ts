import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { FilmPlaylistsService } from '@features/film';
import { Playlist } from '@features/playlist';
import { FilmsRoutingEnum } from '@pages/films/enums';
import { filter, Observable, switchMap } from 'rxjs';
import { SelectedPlaylistCategory } from '../../states';

@Component({
    selector: 'app-playlists-list',
    templateUrl: './playlists-list.component.html',
    styleUrls: ['./playlists-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistsListComponent implements OnInit {
    public playlistsOfSelectedCategory$!: Observable<Playlist[] | null>;

    constructor(
        private readonly router: Router,
        private readonly selectedPlaylistCategory: SelectedPlaylistCategory,
        private readonly playlistsService: FilmPlaylistsService
    ) {}

    public ngOnInit(): void {
        this.initPlaylistsOfSelectedCategoryObservable();
    }

    public onPlaylistClick(playlist: Playlist): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Films}/${FilmsRoutingEnum.Playlist}/${playlist.id}`);
    }

    private initPlaylistsOfSelectedCategoryObservable(): void {
        this.playlistsOfSelectedCategory$ = this.selectedPlaylistCategory.data$
            .pipe(
                filter((selectedCategory) => !!selectedCategory),
                switchMap((selectedCategoryId) => this.playlistsService.getAll(selectedCategoryId as number))
            );
    }
}

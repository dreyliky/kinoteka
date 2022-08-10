import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@core/services';
import { FilmPlaylistsService } from '@features/film';
import { Playlist } from '@features/playlist';
import { Observable } from 'rxjs';
import { PlaylistFilmsParamEnum } from '../../enums';

@Component({
    selector: 'app-header-portal-content',
    templateUrl: './header-portal-content.component.html',
    styleUrls: ['./header-portal-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class HeaderPortalContentComponent implements OnInit {
    public openedPlaylist$!: Observable<Playlist | null>;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly playlistsService: FilmPlaylistsService
    ) {}

    public ngOnInit(): void {
        const playlistId = +this.activatedRoute.snapshot.params[PlaylistFilmsParamEnum.PlaylistId];
        this.openedPlaylist$ = this.playlistsService.getById(playlistId);
    }
}

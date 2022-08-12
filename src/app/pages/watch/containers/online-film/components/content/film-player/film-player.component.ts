import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DetailedFilmInfo } from '@features/film';
import { OpenedFilmState } from '../../../states';

@Component({
    selector: 'app-film-player',
    templateUrl: './film-player.component.html',
    styleUrls: ['./film-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmPlayerComponent {
    public film = this.openedFilmState.data as DetailedFilmInfo;

    constructor(
        private readonly openedFilmState: OpenedFilmState
    ) {}
}

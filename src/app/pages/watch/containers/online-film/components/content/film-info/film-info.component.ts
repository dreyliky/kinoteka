import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { DetailedFilmInfo } from '@features/film';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OpenedFilmState } from '../../../states';

@Component({
    selector: 'app-film-info',
    templateUrl: './film-info.component.html',
    styleUrls: ['./film-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmInfoComponent {
    @Output()
    public watchButtonClick = new EventEmitter<MouseEvent>();

    public readonly isMobile = this.deviceDetector.isMobile();

    public get film(): DetailedFilmInfo {
        return this.openedFilmState.data as DetailedFilmInfo;
    }

    public get backdropBackgroundCss(): string {
        return `url(${this.film.backdropUrl || this.film.posterUrl})`;
    }

    constructor(
        private readonly deviceDetector: DeviceDetectorService,
        private readonly openedFilmState: OpenedFilmState
    ) {}
}

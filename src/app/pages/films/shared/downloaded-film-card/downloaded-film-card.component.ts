import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookmarkEnum } from '@features/bookmark';
import { DownloadedFilm } from '@features/film';

@Component({
    selector: 'app-downloaded-film-card',
    templateUrl: './downloaded-film-card.component.html',
    styleUrls: ['./downloaded-film-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadedFilmCardComponent {
    @Input()
    public film!: DownloadedFilm;

    @Input()
    public bookmarks!: BookmarkEnum[];
}

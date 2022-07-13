import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookmarkEnum } from '@features/bookmark';
import { Film } from '@features/film';

@Component({
    selector: 'app-online-film-card',
    templateUrl: './online-film-card.component.html',
    styleUrls: ['./online-film-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineFilmCardComponent {
    @Input()
    public film!: Film;

    @Input()
    public bookmarks!: BookmarkEnum[];
}

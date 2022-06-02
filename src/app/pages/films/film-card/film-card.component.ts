import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '@interfaces';

@Component({
    selector: 'app-film-card',
    templateUrl: './film-card.component.html',
    styleUrls: ['./film-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCardComponent {
    @Input()
    public data!: Film;

    @Output()
    public selected = new EventEmitter();
}

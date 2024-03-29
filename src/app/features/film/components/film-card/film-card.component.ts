import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Film } from '../../interfaces';

@Component({
    selector: 'film-card',
    templateUrl: './film-card.component.html',
    styleUrls: ['./film-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCardComponent {
    @Input()
    public data!: Film;

    public get previewCssUrl(): string {
        return `url(${this.data.previewUrl})`;
    }
}

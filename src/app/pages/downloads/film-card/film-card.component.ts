import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '@interfaces';
import { environment } from 'src/environments/environment';

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

    public get previewUrl(): string {
        return `${environment.backendHost}/films/downloaded/${this.data.kinopoiskId}/preview`;
    }
}

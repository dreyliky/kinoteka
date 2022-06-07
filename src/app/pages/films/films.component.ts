import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsComponent {}

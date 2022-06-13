import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilmsRoutingEnum } from '../../enums';

@Component({
    selector: 'app-section-chips',
    templateUrl: './section-chips.component.html',
    styleUrls: ['./section-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionChipsComponent {
    public readonly filmsRoutingEnum = FilmsRoutingEnum;
}

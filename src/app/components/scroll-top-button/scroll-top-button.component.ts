import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentZoneService } from '@services';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollTopButtonComponent {
    public isArrowUpIconVisible$ = this.contentZoneService.scroll$
        .pipe(
            debounceTime(100),
            map(({ target }) => ((target as HTMLElement).scrollTop > 100))
        );

    constructor(
        private readonly contentZoneService: ContentZoneService,
    ) {}

    public onClick(): void {
        this.contentZoneService.scrollTop();
    }
}

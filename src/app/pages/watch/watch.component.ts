import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-watch',
    template: '<router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchComponent {}

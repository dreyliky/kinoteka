import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { WatchComponent } from './watch.component';
import { WatchRouting } from './watch.routing';

@NgModule({
    declarations: [
        WatchComponent
    ],
    imports: [
        SharedModule,
        WatchRouting
    ]
})
export class WatchModule {}

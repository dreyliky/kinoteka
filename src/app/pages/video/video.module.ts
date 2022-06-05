import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { VideoComponent } from './video.component';
import { VideoRouting } from './video.routing';

@NgModule({
    declarations: [
        VideoComponent
    ],
    imports: [
        SharedModule,
        VideoRouting
    ]
})
export class VideoModule {}

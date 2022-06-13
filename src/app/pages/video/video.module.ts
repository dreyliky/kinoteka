import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SectionChipsComponent } from './components';
import { VideoComponent } from './video.component';
import { VideoRouting } from './video.routing';

@NgModule({
    declarations: [
        VideoComponent,
        SectionChipsComponent
    ],
    imports: [
        SharedModule,
        VideoRouting
    ]
})
export class VideoModule {}

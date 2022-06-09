import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { DownloadedSectionComponent } from './downloaded-section.component';
import { PaginatorComponent } from './paginator';

@NgModule({
    declarations: [
        DownloadedSectionComponent,
        PaginatorComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        DownloadedSectionComponent
    ]
})
export class DownloadedSectionModule {}

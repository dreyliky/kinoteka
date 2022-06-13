import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadedVideoComponent } from './downloaded-video.component';
import { DownloadedVideoDetailsRouteParamEnum } from './enums';

const routes: Routes = [
    {
        path: `:${DownloadedVideoDetailsRouteParamEnum.Id}`,
        component: DownloadedVideoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DownloadedVideoRouting {}

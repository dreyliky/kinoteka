import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadingMediaComponent } from './downloading-media.component';

const routes: Routes = [
    {
        path: '',
        component: DownloadingMediaComponent
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
export class DownloadingMediaRouting {}

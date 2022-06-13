import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadedComponent } from './downloaded.component';

const routes: Routes = [
    {
        path: '',
        component: DownloadedComponent,
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
export class DownloadedRouting {}

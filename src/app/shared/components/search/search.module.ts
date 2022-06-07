import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '../icon/icon.module';
import { SearchComponent } from './search.component';

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        IconModule,
        MatButtonModule
    ],
    exports: [
        SearchComponent
    ]
})
export class SearchModule {}

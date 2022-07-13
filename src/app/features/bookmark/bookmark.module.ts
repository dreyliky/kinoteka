import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BookmarkDropdownComponent, BookmarksRowComponent } from './components';

@NgModule({
    declarations: [
        BookmarkDropdownComponent,
        BookmarksRowComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        BookmarkDropdownComponent,
        BookmarksRowComponent
    ]
})
export class BookmarkModule {}

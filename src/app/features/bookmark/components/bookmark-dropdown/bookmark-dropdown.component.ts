import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { BOOKMARK_MAP } from '../../data';
import { BookmarkEnum } from '../../enums';
import { Bookmark } from '../../interfaces';

@Component({
    selector: 'bookmark-dropdown',
    templateUrl: './bookmark-dropdown.component.html',
    styleUrls: ['./bookmark-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
            useValue: <MatCheckboxDefaultOptions>{
                clickAction: 'noop',
                color: 'accent'
            }
        }
    ]
})
export class BookmarkDropdownComponent {
    @Input()
    public set selectedBookmarks(data: BookmarkEnum[]) {
        this.initSelectedBookmarksMap(data);
    }

    @Output()
    public bookmarkSelected = new EventEmitter<Bookmark>();

    @Output()
    public bookmarkDeselected = new EventEmitter<Bookmark>();

    public readonly bookmarks = [...BOOKMARK_MAP.values()];

    public selectedBookmarksMap!: Map<number, boolean>;

    public onMenuItemClick(event: Event, bookmark: Bookmark): void {
        const newSelectionState = !this.selectedBookmarksMap.has(bookmark.type);
        const targetOutputEvent = (newSelectionState) ? this.bookmarkSelected : this.bookmarkDeselected;

        targetOutputEvent.emit(bookmark);
        this.selectedBookmarksMap.set(bookmark.type, newSelectionState);
        event.stopPropagation();
    }

    private initSelectedBookmarksMap(selectedBookmarks: BookmarkEnum[]): void {
        this.selectedBookmarksMap = new Map();

        selectedBookmarks
            .map((selectedBookmarkId) => this.selectedBookmarksMap.set(selectedBookmarkId, true))
    }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BOOKMARK_MAP } from '@features/bookmark/data';
import { BookmarkEnum } from '@features/bookmark/enums';
import { Bookmark } from '@features/bookmark/interfaces';

@Component({
    selector: 'bookmarks-row',
    templateUrl: './bookmarks-row.component.html',
    styleUrls: ['./bookmarks-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksRowComponent {
    @Input()
    public set bookmarks(data: BookmarkEnum[]) {
        this.initBookmarksData(data ?? []);
    }

    public bookmarksData: Bookmark[] = [];

    private initBookmarksData(bookmarkIds: BookmarkEnum[]): void {
        this.bookmarksData = bookmarkIds
            .map((bookmarkId) => BOOKMARK_MAP.get(bookmarkId) as Bookmark);
    }
}

import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { NgxState, ObjectState } from 'ngx-base-state';
import { BookmarkEnum } from '../../bookmark';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class BookmarkedTvSeriesesState extends ObjectState<BookmarkedMediaDictionary> {
    public add(kinopoiskId: string, bookmark: BookmarkEnum): void {
        let bookmarks = this.getBookmarks(kinopoiskId);
        bookmarks = [...bookmarks, bookmark];

        this.updateWithPartial({ [kinopoiskId]: bookmarks });
    }

    public remove(kinopoiskId: string, bookmark: BookmarkEnum): void {
        let bookmarks = this.getBookmarks(kinopoiskId);
        bookmarks = bookmarks.filter((currBookmark) => (currBookmark !== bookmark))

        this.updateWithPartial({ [kinopoiskId]: bookmarks });
    }

    private getBookmarks(kinopoiskId: string): BookmarkEnum[] {
        return (this.data?.[kinopoiskId] ?? []);
    }
}

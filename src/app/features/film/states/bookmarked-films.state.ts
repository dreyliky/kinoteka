import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { ObjectState } from 'ngx-base-state';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsState extends ObjectState<BookmarkedMediaDictionary> {
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
        return this.data?.[kinopoiskId] ?? [];
    }
}

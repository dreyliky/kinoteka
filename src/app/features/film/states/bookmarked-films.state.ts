import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BaseState } from '@core/states';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsState extends BaseState<BookmarkedMediaDictionary> {
    public add(kinopoiskId: string, bookmark: BookmarkEnum): void {
        let bookmarks = this.data?.[kinopoiskId] ?? [];
        bookmarks = [...bookmarks, bookmark];

        this.set({ ...this.data, [kinopoiskId]: bookmarks });
    }

    public remove(kinopoiskId: string, bookmark: BookmarkEnum): void {
        let bookmarks = this.data?.[kinopoiskId] ?? [];
        bookmarks = bookmarks.filter((currBookmark) => (currBookmark !== bookmark))

        this.set({ ...this.data, [kinopoiskId]: bookmarks });
    }
}

import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BaseState } from '@core/states';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedVideosState extends BaseState<BookmarkedMediaDictionary> {
    public add(videoId: string, bookmark: BookmarkEnum): void {
        let bookmarks = this.data?.[videoId] ?? [];
        bookmarks = [...bookmarks, bookmark];

        this.set({ ...this.data, [videoId]: bookmarks });
    }

    public remove(videoId: string, bookmark: BookmarkEnum): void {
        let bookmarks = this.data?.[videoId] ?? [];
        bookmarks = bookmarks.filter((currBookmark) => (currBookmark !== bookmark))

        this.set({ ...this.data, [videoId]: bookmarks });
    }
}

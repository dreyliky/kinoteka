import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { ObjectState } from 'ngx-base-state';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedVideosState extends ObjectState<BookmarkedMediaDictionary> {
    public add(videoId: string, bookmark: BookmarkEnum): void {
        let bookmarks = this.getBookmarks(videoId);
        bookmarks = [...bookmarks, bookmark];

        this.updateWithPartial({ [videoId]: bookmarks });
    }

    public remove(videoId: string, bookmark: BookmarkEnum): void {
        let bookmarks = this.getBookmarks(videoId);
        bookmarks = bookmarks.filter((currBookmark) => (currBookmark !== bookmark))

        this.updateWithPartial({ [videoId]: bookmarks });
    }

    private getBookmarks(videoId: string): BookmarkEnum[] {
        return (this.data?.[videoId] ?? []);
    }
}

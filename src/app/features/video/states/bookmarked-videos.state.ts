import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { NgxState, ObjectState } from 'ngx-base-state';
import { BookmarkEnum } from '../../bookmark';

@NgxState()
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

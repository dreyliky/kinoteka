import { BookmarkEnum } from '@features/bookmark';

export interface BookmarkedMediaDictionary {
    [mediaId: string]: BookmarkEnum[];
}

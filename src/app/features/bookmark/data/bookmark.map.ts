import { BookmarkEnum } from '../enums';
import { Bookmark } from '../interfaces';

export const BOOKMARK_MAP = new Map<BookmarkEnum, Bookmark>()
    .set(BookmarkEnum.Red, { type: BookmarkEnum.Red, color: '#f55d53' })
    .set(BookmarkEnum.Green, { type: BookmarkEnum.Green, color: '#5ced91' })
    .set(BookmarkEnum.Blue, { type: BookmarkEnum.Blue, color: '#4484eb' })
    .set(BookmarkEnum.Orange, { type: BookmarkEnum.Orange, color: '#f59b47' })
    .set(BookmarkEnum.Yellow, { type: BookmarkEnum.Yellow, color: '#f5f24c' });

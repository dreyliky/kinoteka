import { BookmarkEnum } from '../enums';

export interface Bookmark {
    readonly type: BookmarkEnum;
    readonly color: string;
}

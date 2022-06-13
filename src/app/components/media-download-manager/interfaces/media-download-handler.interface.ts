export interface MediaDownloadHandler<T> {
    getMediaTitle(media: T): string;
    onDownloadStart?(media: T): void;
    onDownloadEnd?(media: T): void;
    onDownloadCancel?(media: T): void;
}

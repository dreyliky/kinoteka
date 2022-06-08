export interface VideoCdnResponse<T> {
    readonly data: T[];
    readonly result: boolean;
    readonly current_page: number;
    readonly first_page_url: string;
    readonly from: number;
    readonly last_page: number;
    readonly last_page_url: string | null;
    readonly next_page_url: string | null;
    readonly prev_page_url: string | null;
    readonly path: string;
    readonly per_page: number;
    readonly to: number;
    readonly total: number;
    readonly total_count: number;
}

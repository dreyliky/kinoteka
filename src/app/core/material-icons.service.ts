import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface Icon {
    readonly name: string;
    readonly url: string;
}

@Injectable()
export class MaterialIconsService {
    private readonly iconsFolderPath = '/assets/icons/material';

    private readonly icons: Icon[] = [
        { name: 'movie', url: '/movie_white_24dp.svg' },
        { name: 'tv_series', url: '/tv_series_white_24dp.svg' },
        { name: 'video', url: '/video_white_24dp.svg' },
        { name: 'music', url: '/music_white_24dp.svg' },
        { name: 'download', url: '/download_white_24dp.svg' },
        { name: 'settings', url: '/settings_white_24dp.svg' },
        { name: 'menu', url: '/menu_white_24dp.svg' },
        { name: 'arrow_upward', url: '/arrow_upward_white_24dp.svg' },
        { name: 'search', url: '/search_white_24dp.svg' },
        { name: 'close', url: '/close_white_24dp.svg' },
        { name: 'date', url: '/date_white_24dp.svg' }
    ];

    constructor(
        private readonly matIconRegistry: MatIconRegistry,
        private readonly domSanitizer: DomSanitizer
    ) {}

    public registerAll(): void {
        this.icons
            .forEach(({ name, url }) => {
                const fullUrl = `${this.iconsFolderPath}${url}`;
                const trustUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(fullUrl);

                this.matIconRegistry.addSvgIcon(name, trustUrl);
            });
    }
}

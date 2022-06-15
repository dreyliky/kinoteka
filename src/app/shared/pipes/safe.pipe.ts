import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { KeysOfType } from '@core/types';

type SanitizerType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {
    private static sanitizerBypassMap = new Map<SanitizerType, KeysOfType<DomSanitizer, Function>>()
        .set('html', 'bypassSecurityTrustHtml')
        .set('style', 'bypassSecurityTrustStyle')
        .set('script', 'bypassSecurityTrustScript')
        .set('url', 'bypassSecurityTrustUrl')
        .set('resourceUrl', 'bypassSecurityTrustResourceUrl');

    constructor(
        private readonly sanitizer: DomSanitizer
    ) {}

    public transform(value: string, type: SanitizerType): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        const targetMethodName = SafePipe.sanitizerBypassMap.get(type) as string;

        if (targetMethodName) {
            return (this.sanitizer as any)[targetMethodName](value);
        }

        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'translationsCount'
})
export class TranslationsCountPipe implements PipeTransform {
    private static translationsCountMap = new Map<number, string>()
        .set(0, 'немає перекладів')
        .set(1, 'один переклад')
        .set(2, 'два переклади')
        .set(3, 'три переклади')
        .set(4, 'чотири переклади')
        .set(5, `п'ять перекладів`)
        .set(6, 'шість перекладів')
        .set(7, 'сім перекладів')
        .set(8, 'вісім перекладів')
        .set(9, `дев'ять перекладів`)
        .set(10, `десять перекладів`);

    public transform(count: number): string {
        const translationsCountText = TranslationsCountPipe.translationsCountMap.get(count);

        if (translationsCountText) {
            return translationsCountText;
        }

        return 'більше десяти перекладів';
    }
}

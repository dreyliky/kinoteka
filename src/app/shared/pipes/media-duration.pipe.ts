import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mediaDuration'
})
export class MediaDurationPipe implements PipeTransform {
    private static durationTextMap = new Map<number, string>()
        .set(30, 'до тридцяти секунд')
        .set(60, 'до однієї хвилини')
        .set(300, `до п'яти хвилин`)
        .set(600, 'до десяти хвилин')
        .set(900, `до п'ятнадцяти хвилин`)
        .set(1800, 'до тридцяти секунд')
        .set(2700, 'до 45 хвилин')
        .set(3600, 'до однієї години')
        .set(5400, 'до півтори години')
        .set(7200, 'до двох годин')
        .set(9000, 'до двох з половиною годин')
        .set(10800, 'до трьох годин')
        .set(12600, 'до трьох з половиною годин')
        .set(14400, 'до чотирьох годин')
        .set(16200, 'до чотирьох з половиною годин')
        .set(18000, `до п'яти годин`)
        .set(18001, `більше п'яти годин`);

    public transform(seconds: number): string {
        const mapKeys = [...MediaDurationPipe.durationTextMap.keys()];
        const lastMapKey = mapKeys[mapKeys.length - 1];
        const closestKeyFromMap = mapKeys
            .find((mapKey) => (seconds <= mapKey));

        if (closestKeyFromMap) {
            return MediaDurationPipe.durationTextMap.get(closestKeyFromMap) as string;
        }

        return MediaDurationPipe.durationTextMap.get(lastMapKey) as string;
    }
}

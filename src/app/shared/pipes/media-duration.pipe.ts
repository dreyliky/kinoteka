import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mediaDuration'
})
export class MediaDurationPipe implements PipeTransform {
    public transform(seconds: number): string {
        if (seconds <= 30) {
            return 'до тридцяти секунд';
        } else if (seconds <= 60) {
            return 'до однієї хвилини';
        } else if (seconds <= 300) {
            return `до п'яти хвилин`;
        } else if (seconds <= 600) {
            return 'до десяти хвилин';
        } else if (seconds <= 900) {
            return `до п'ятнадцяти хвилин`;
        } else if (seconds <= 1800) {
            return 'до тридцяти хвилин';
        } else if (seconds <= 2700) {
            return 'до 45 хвилин';
        } else if (seconds <= 3600) {
            return 'до однієї години';
        } else if (seconds <= 5400) {
            return 'до півтори години';
        } else if (seconds <= 7200) {
            return 'до двох годин';
        } else if (seconds <= 9000) {
            return 'до двох з половиною годин';
        } else if (seconds <= 10800) {
            return 'до трьох годин';
        } else if (seconds <= 12600) {
            return 'до трьох з половиною годин';
        } else if (seconds <= 14400) {
            return 'до чотирьох годин';
        } else if (seconds <= 16200) {
            return 'до чотирьох з половиною годин';
        }

        return `більше п'яти годин`;
    }
}

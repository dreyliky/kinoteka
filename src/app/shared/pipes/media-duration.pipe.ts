import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mediaDuration'
})
export class MediaDurationPipe implements PipeTransform {
    public transform(seconds: number): string {
        if (seconds <= 900) {
            return 'до 15 хвилин';
        } else if (seconds <= 1800) {
            return 'до 30 хвилин';
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
        }

        return 'більше трьох годин';
    }
}

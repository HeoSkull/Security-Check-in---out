import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'MillisecondsToHours',
  standalone: true,
})
export class ToHoursPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const hours = Math.floor(value / 3600000);
    const minutes = Math.floor((value % 3600000) / 60000);
    const seconds = Math.floor((value % 60000) / 1000);

    //Add leading zeros
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }
}

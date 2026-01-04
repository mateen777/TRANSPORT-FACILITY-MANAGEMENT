import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time24to12',
  standalone: true
})
export class Time24to12Pipe implements PipeTransform {

  transform(time24h: string): string {
    if (!time24h || !time24h.includes(':')) {
      return time24h; // Return original value if it's not a valid time string
    }

    // Split the time string into hours and minutes
    const [hours24, minutes] = time24h.split(':').map(Number);

    // Determine the meridian (AM/PM)
    const meridian = hours24 >= 12 ? 'PM' : 'AM';

    // Convert the 24-hour to 12-hour format
    const hours12 = hours24 % 12 || 12; // The modulo operator handles 13-23, and 0 becomes 12

    // Pad the minutes with a leading zero if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${hours12}:${formattedMinutes} ${meridian}`;
  }

}

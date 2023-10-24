import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsisPipe'
})
export class EllipsisPipePipe implements PipeTransform {
  transform(value: string, maxLength: number = 35): string {
    if (value.length > maxLength) {
      const truncatedText = value.substr(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(' ');
      if (lastSpaceIndex > -1) {
        return truncatedText.substr(0, lastSpaceIndex) + '...';
      } else {
        return truncatedText + '...';
      }
    }
    return value;
  }

}

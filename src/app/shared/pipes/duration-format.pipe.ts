import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'durationFormat',
})
export class durationPipe implements PipeTransform {
    transform(duration: string): string {
        const value = Number(duration);
        
        if (isNaN(value)) return '0:00';
        const mins = Math.floor(value / 60);
        const secs = Math.floor(value % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}
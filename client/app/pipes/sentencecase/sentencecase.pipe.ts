import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentencecase',
})
export class SentenceCasePipe implements PipeTransform {
  transform(sentence: string): string {
    try {
      return `${sentence[0].toUpperCase()}${sentence.slice(1).toLowerCase()}`;
    } catch (error) {
      return sentence;
    }
  }
}

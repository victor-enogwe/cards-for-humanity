import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  randomNumberFromInterval({ min, max }: { min: number; max: number }): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomItemsFromArray<T>(amount: number) {
    return (array: T[]) =>
      array.reduce((accumulated: T[], _current: T, _index: number, currentArray: T[]) => {
        const max = currentArray.length - 1;
        const chosenIndex = this.randomNumberFromInterval({ min: 0, max });
        const chosen = currentArray[chosenIndex];
        currentArray.splice(chosenIndex, 1);
        return accumulated.length === amount ? accumulated : [...accumulated, chosen];
      }, []);
  }

  rollingCounter({
    min = 0,
    max,
    start,
    operation = 'forward',
  }: {
    min: number;
    max: number;
    start?: number;
    operation: 'forward' | 'backward';
  }) {
    const floor = operation === 'forward' ? min : max;
    const ceiling = operation === 'forward' ? max : min;
    const increment = operation === 'forward' ? 1 : -1;
    let count = start ?? floor;
    const counter = () => (count === ceiling ? floor : (count += increment));

    return counter;
  }
}

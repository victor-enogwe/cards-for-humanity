import { Inject, Injectable } from '@angular/core';
import { AnyObject } from '../../@types/global';
import { CRYPT } from '../../modules/cah/cah.module';
import { Crypt } from '../../utils/crypt';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(@Inject(CRYPT) private readonly crypt: Crypt) {}

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

  isJSON(value: any): boolean {
    try {
      return Boolean(JSON.parse(value));
    } catch (error) {
      return false;
    }
  }

  async encode(item: string | AnyObject, count: number = 1): Promise<string> {
    const value = typeof item === 'object' ? JSON.stringify(item) : item;
    if (count < 1) return value;
    const encrypted = await this.crypt.encrypt(value);
    return this.encode(encrypted, count - 1);
  }

  async decode<T>(item: string | null, count: number = 1): Promise<T | AnyObject | null> {
    try {
      if (!item) throw new Error('item must be a string');
      const decoded = await this.crypt.decrypt(item);
      const value = this.isJSON(decoded) ? JSON.parse(decoded) : decoded;
      if (count < 2) return value;
      return this.decode(decoded, count - 1);
    } catch (error) {
      return null;
    }
  }
}

import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainContentRefService {
  ref!: ElementRef<HTMLDivElement>;

  mainContentRef(ref: ElementRef): void {
    this.ref = ref;
  }
}

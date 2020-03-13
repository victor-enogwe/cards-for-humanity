import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'cah-root',
  template: '<cah-nav></cah-nav><router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CahComponent { }

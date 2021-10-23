import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cah-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {}

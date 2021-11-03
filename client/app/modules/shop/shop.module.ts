import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { ShopComponent } from '../../components/pages/shop/shop.component';

const routes: Routes = [{ path: '', component: ShopComponent }];

@NgModule({
  declarations: [ShopComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ShopModule {}

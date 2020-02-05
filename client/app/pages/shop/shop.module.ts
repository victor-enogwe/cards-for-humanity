import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

// components
import { ShopComponent } from 'client/app/components/shop/shop.component'

// export routes to enable AOT compile route data
export const routes: Routes = [{ path: '', component: ShopComponent }]

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopModule { }

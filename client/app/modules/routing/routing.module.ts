import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// guards
import { AuthGuard } from 'client/app/guards/auth/auth.guard'

// services
import { AuthService } from 'client/app/services/auth/auth.service'


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../../pages/auth/auth.module').then(m => m.AuthModule), canLoad: [AuthGuard] },
  { path: 'play', loadChildren: () => import('../../pages/play/play.module').then(m => m.PlayModule), canLoad: [AuthGuard] },
  { path: 'shop', loadChildren: () => import('../../pages/shop/shop.module').then(m => m.ShopModule), canLoad: [AuthGuard] },
  { path: '', loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule) },
  { path: '**', loadChildren: () => import('../../pages/notfound/notfound.module').then(m => m.NotFoundModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class CahRoutingModule { }

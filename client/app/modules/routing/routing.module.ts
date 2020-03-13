import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// guards
import { NoAuthGuard } from '../../guards/noauth/noauth.guard'
import { AuthGuard } from '../..//guards/auth/auth.guard'

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../../pages/auth/auth.module').then(m => m.AuthModule), canActivate: [NoAuthGuard] },
  { path: 'play', loadChildren: () => import('../../pages/play/play.module').then(m => m.PlayModule), canActivate: [AuthGuard] },
  { path: 'shop', loadChildren: () => import('../../pages/shop/shop.module').then(m => m.ShopModule), canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule) },
  { path: '**', loadChildren: () => import('../../pages/notfound/notfound.module').then(m => m.NotFoundModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CahRoutingModule { }

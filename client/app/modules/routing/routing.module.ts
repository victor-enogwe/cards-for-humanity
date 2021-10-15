import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// guards
import { AuthGuard } from '../../guards/auth/auth.guard'
import { LoadGuard } from '../../guards/load/load.guard'

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../../pages/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard] },
  { path: 'play', loadChildren: () => import('../../pages/play/play.module').then(m => m.PlayModule), canLoad: [LoadGuard] },
  { path: 'shop', loadChildren: () => import('../../pages/shop/shop.module').then(m => m.ShopModule), canLoad: [LoadGuard] },
  { path: '', loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule) },
  { path: '**', loadChildren: () => import('../../pages/notfound/notfound.module').then(m => m.NotFoundModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard, LoadGuard]
})
export class CahRoutingModule { }

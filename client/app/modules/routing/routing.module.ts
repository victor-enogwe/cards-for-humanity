import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { NoAuthGuard } from '../../guards/no-auth/no-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
    canLoad: [NoAuthGuard],
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
  },
  {
    path: 'play',
    loadChildren: () => import('../play/play.module').then((m) => m.PlayModule),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
  },
  { path: 'shop', loadChildren: () => import('../shop/shop.module').then((m) => m.ShopModule) },
  { path: '', loadChildren: () => import('../home/home.module').then((m) => m.HomeModule) },
  { path: '404', loadChildren: () => import('../notfound/notfound.module').then((m) => m.NotFoundModule) },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [NoAuthGuard, AuthGuard],
})
export class CahRoutingModule {}

import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { NoAuthGuard } from '../../guards/no-auth/no-auth.guard';
import { CahRouteReuseStrategy } from '../../utils/route-reuse-strategy';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
  },
  {
    path: 'play',
    loadChildren: () => import('../play/play.module').then((m) => m.PlayModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  { path: 'shop', loadChildren: () => import('../shop/shop.module').then((m) => m.ShopModule) },
  { path: '404', loadChildren: () => import('../notfound/notfound.module').then((m) => m.NotFoundModule) },
  { path: '', loadChildren: () => import('../home/home.module').then((m) => m.HomeModule) },
  { path: '**', redirectTo: '/404' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      initialNavigation: 'disabled',
      canceledNavigationResolution: 'computed',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
  providers: [NoAuthGuard, AuthGuard, { provide: RouteReuseStrategy, useClass: CahRouteReuseStrategy }],
})
export class CahRoutingModule {}

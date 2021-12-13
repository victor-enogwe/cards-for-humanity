import { BreakpointObserver } from '@angular/cdk/layout';
import { Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { Avatar } from '../../@types/global';
import { Mutation, Query, SetFullWidthMutationInput } from '../../@types/graphql';
import { FULL_WIDTH_QUERY, NAV_OPEN_QUERY, SET_FULL_WIDTH_MUTATION, TOGGLE_NAV_MUTATION } from '../../graphql';
import { STATIC_URL } from '../../modules/cah/cah.module';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  breakpoint$ = this.breakpointObserver.observe('(max-width: 576px)');
  isMobile$ = this.breakpoint$.pipe(map(({ matches }) => matches));
  fullWidth$ = this.getFulWidth().valueChanges.pipe(map(({ data: { fullWidth } }) => fullWidth));
  navOpen$ = this.navOpen().valueChanges.pipe(map(({ data: { navOpen } }) => navOpen));
  avatarNames: Avatar['name'][] = [
    'ABBY',
    'ALFRED',
    'ANDINA',
    'ASTRO',
    'CAMILE',
    'DOROTHY',
    'DUDAI',
    'EDUARDO',
    'GENERAL',
    'GRACE',
    'IRANIR',
    'JENNIFER',
    'LABRAT',
    'LUTHER',
    'RAINBOWNESS',
    'SHIN',
  ];
  avatars: Avatar[] = this.avatarNames.map((name) => ({ name, link: `${this.staticURL}assets/img/avatars/${name.toLowerCase()}.gif` }));

  constructor(private breakpointObserver: BreakpointObserver, private apollo: Apollo, @Inject(STATIC_URL) private staticURL: string) {}

  setFullWidth(input: SetFullWidthMutationInput) {
    return this.apollo.mutate<Pick<Mutation, 'setFullWidth'>>({ mutation: SET_FULL_WIDTH_MUTATION, variables: { input } });
  }

  private getFulWidth() {
    return this.apollo.watchQuery<Pick<Query, 'fullWidth'>>({ query: FULL_WIDTH_QUERY, fetchPolicy: 'cache-only' });
  }

  toggleNav() {
    return this.apollo.mutate<Pick<Mutation, 'toggleNav'>>({ mutation: TOGGLE_NAV_MUTATION });
  }

  private navOpen() {
    return this.apollo.watchQuery<Pick<Query, 'navOpen'>>({ query: NAV_OPEN_QUERY, fetchPolicy: 'cache-only' });
  }

  // resizeObserver(element: any, options: ResizeObserverOptions) {
  //   const obs = new Subject()
  //   const watch = new ResizeObserver((entries, observer) => {
  //     obs.subscribe()
  //   }).observe(element, options)

  // }
}

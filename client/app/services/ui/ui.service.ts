import { BreakpointObserver } from '@angular/cdk/layout';
import { Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { Avatar, TIncomingRelay } from '../../@types/global';
import { Mutation, SetFullWidthMutationInput } from '../../@types/graphql';
import { FULL_WIDTH_QUERY, SET_FULL_WIDTH_MUTATION } from '../../graphql';
import { STATIC_URL } from '../../modules/cah/cah.module';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  isMobile$ = this.breakpointObserver.observe('(max-width: 576px)').pipe(map(({ matches }) => matches));
  fullWidth$ = this.getFulWidth().valueChanges.pipe(map(({ data: { fullWidth } }) => fullWidth));
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

  getFulWidth() {
    return this.apollo.watchQuery<{ fullWidth: TIncomingRelay<Boolean> }>({
      query: FULL_WIDTH_QUERY,
      fetchPolicy: 'cache-only',
    });
  }
}

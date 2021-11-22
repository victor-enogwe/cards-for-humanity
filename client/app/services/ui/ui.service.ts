import { BreakpointObserver } from '@angular/cdk/layout';
import { Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { TIncomingRelay } from 'client/app/@types/global';
import { FULL_WIDTH_QUERY, SET_FULL_WIDTH_MUTATION } from 'client/app/graphql';
import { STATIC_URL } from 'client/app/modules/cah/cah.module';
import { map } from 'rxjs';
import { Mutation, SetFullWidthMutationInput } from '../../@types/graphql';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  isMobile$ = this.breakpointObserver.observe('(max-width: 576px)').pipe(map(({ matches }) => matches));
  fullWidth$ = this.getFulWidth().valueChanges.pipe(map(({ data: { fullWidth } }) => fullWidth));
  avatars = [
    'abby',
    'alfred',
    'andina',
    'astro',
    'camile',
    'dorothy',
    'dudai',
    'eduardo',
    'general',
    'grace',
    'iranir',
    'jennifer',
    'labrat',
    'luther',
    'rainbowness',
    'shin',
  ].map((name) => ({ name, link: `${this.staticURL}assets/img/avatars/${name}.gif` }));

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

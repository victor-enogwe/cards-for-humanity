import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SET_FULL_WIDTH_MUTATION } from 'client/app/graphql';
import { Mutation, SetFullWidthMutationInput } from '../../@types/graphql';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private apollo: Apollo) {}

  setFullWidth(input: SetFullWidthMutationInput) {
    return this.apollo.mutate<Pick<Mutation, 'setFullWidth'>>({ mutation: SET_FULL_WIDTH_MUTATION, variables: { input } });
  }
}

import { FieldPolicy, FieldReadFunction } from '@apollo/client/core';
import { TypedTypePolicies } from '../@types/graphql';

const defaultResolvers: FieldPolicy<any, any, any> | FieldReadFunction<any, any> | undefined = {
  read: (value) => value,
  merge: (_, incoming) => incoming,
};

export const typePolicies: TypedTypePolicies = {
  Query: {
    queryType: true,
    fields: {
      newGame: defaultResolvers,
      fullWidth: defaultResolvers,
      navOpen: {
        read: defaultResolvers.read,
        merge: (_, inc) => {
          console.log(_, inc);
          return inc;
        },
      },
    },
  },
  GenreNode: {
    fields: {
      selected: {
        merge: defaultResolvers.merge,
      },
    },
  },
};

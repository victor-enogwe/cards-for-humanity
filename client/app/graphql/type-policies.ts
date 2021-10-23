import { TypedTypePolicies } from '../@types/graphql';

export const typePolicies: TypedTypePolicies = {
  QueryFieldPolicy: {
    fields: {
      newGame: {
        read: (value) => value,
        merge: (...args) => console.log(args),
      },
    },
  },
  MutationFieldPolicy: {
    mutationType: true,
    fields: {
      createGameLocal(...args) {
        console.log(args);
      },
    },
  },
  GenreNode: {
    fields: {
      selected: {
        read: (value = false) => value,
        merge: (_, incoming) => incoming,
      },
    },
  },
};

export type PossibleTypesResultData = {
  possibleTypes: {
    Node: ['BlackCardNode', 'GenreNode', 'GameNode', 'PlayerNode', 'UserNode', 'ProfileNode', 'SocialNode', 'WhiteCardNode'];
    CreateUserPayload: ['CreateUserFailEmailExists', 'CreateUserFailOthers', 'CreateUserSuccess'];
  };
};
const result: PossibleTypesResultData = {
  possibleTypes: {
    Node: ['BlackCardNode', 'GenreNode', 'GameNode', 'PlayerNode', 'UserNode', 'ProfileNode', 'SocialNode', 'WhiteCardNode'],
    CreateUserPayload: ['CreateUserFailEmailExists', 'CreateUserFailOthers', 'CreateUserSuccess'],
  },
};
export default result;

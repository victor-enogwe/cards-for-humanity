import { NormalizedCacheObject } from '@apollo/client/core';

export interface Genre {
  name: string
}

export interface SignUpData {
  tokenAuth: {
    token: string
  }
}

declare global {
  interface Window {
    __APOLLO_CLIENT__: NormalizedCacheObject
  }
}

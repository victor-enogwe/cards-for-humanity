import { Observable } from 'rxjs'
import { UrlTree } from '@angular/router'
import { NormalizedCacheObject } from '@apollo/client/core'
import { TIncomingRelay as TIncoming } from '@apollo/client/utilities/policies/pagination'

declare global {
  interface Window {
    __APOLLO_CLIENT__: NormalizedCacheObject
  }
}

export interface TRelayEdge<TNode> {
    cursor?: string;
    node: TNode;
};

export interface TIncomingRelay<TNode> extends TIncoming<TNode> {
  edges?: TRelayEdge<TNode>[];
  totalCount: number
}

export interface Genre {
  id: number
  description: string
  credit: string
  selected: boolean
}

export interface AllGenreGeneric extends Partial<Genre> {
  offset?: number
  before?: string
  after?: string
  id_Lt?: number
  id_Gt?: number
  description_Icontains?: string
  description_Istartswith?: string
  credit_Icontains?: string
  credit_Istartswith?: string
}

export interface AllGenreFirst extends AllGenreGeneric {
  first: number
}

export interface AllGenreLast extends AllGenreGeneric {
  last: number
}

export type AllGenre = AllGenreFirst | AllGenreLast

export interface SignUpData {
  tokenAuth: {
    token: string
  }
}

export enum CardType {
  PICK1 = '1',
  PICK2 = '2',
  ANSWER = '3'
}

export interface Definition {
  kind: string
  operation?: string
}


export type CanActivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree

export type CanLoadType = Observable<boolean> | Promise<boolean> | boolean

export interface AuthUser {
  username: string
  password: string
  remember?: boolean
}

/**
 * Seo Meta Attribute
 *
 * @export
 * @enum {number}
 */
export enum SeoMetaTagAttr {
  name = 'name',
  property = 'property'
}

export interface SeoMetaTag {
  attr: SeoMetaTagAttr
  attrValue: string
  value?: string
}


export interface SeoData {
  title?: string
  keywords?: string
  description?: string
  image?: string
  url?: string
  type?: string
  author?: string
  section?: string
  published?: string
  modified?: string
}

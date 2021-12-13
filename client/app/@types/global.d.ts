import { ThemePalette } from '@angular/material/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { UrlTree } from '@angular/router';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { QueryInfo } from '@apollo/client/core/QueryInfo';
import { TIncomingRelay as TIncoming } from '@apollo/client/utilities/policies/pagination';
import { Observable } from 'rxjs';
import { ApiPlayerAvatarChoices } from './graphql';

declare global {
  interface Window {
    __APOLLO_CLIENT__: ApolloCahClient<NormalizedCacheObject>;
    __APOLLO_DEVTOOLS_GLOBAL_HOOK__: Hook;
  }
}

export interface AnyObject<V = any> {
  [property: string]: V;
}

export interface Avatar {
  name: ApiPlayerAvatarChoices;
  link: string;
}

export interface BroadCast<T = any> extends AnyObject {
  event: 'refresh_token' | 'login' | 'logout' | 'tab-leader-election';
  message?: string;
  data?: T;
}

interface ApolloCahClient<TCache> extends Omit<ApolloClient<TCache>, 'devToolsHookCb'> {
  devToolsHookCb: Function;
}

type Hook = {
  ApolloClient: ApolloClient<NormalizedCacheObject> | undefined;
  version: string;
  getQueries: () => QueryInfo[];
  getMutations: () => QueryInfo[];
  getCache: () => void;
};

export interface TRelayEdge<TNode> {
  cursor?: string;
  node: TNode;
}

export interface TIncomingRelay<TNode> extends TIncoming<TNode> {
  edges?: TRelayEdge<TNode>[];
  totalCount: number;
}

export interface Genre {
  id: number;
  description: string;
  credit: string;
  selected: boolean;
}

export interface AllGenreGeneric extends Partial<Genre> {
  offset?: number;
  before?: string;
  after?: string;
  id_Lt?: number;
  id_Gt?: number;
  description_Icontains?: string;
  description_Istartswith?: string;
  credit_Icontains?: string;
  credit_Istartswith?: string;
}

export interface AllGenreFirst extends AllGenreGeneric {
  first: number;
}

export interface AllGenreLast extends AllGenreGeneric {
  last: number;
}

export type AllGenre = AllGenreFirst | AllGenreLast;

export enum GAME_STATUS {
  GAP = 'Awaiting Players',
  GAC = 'Awaiting Czar',
  GS = 'Game Started',
  GE = 'Game Ended',
}

export interface Game {
  id: number;
  rounds: number;
  roundTime: number;
  numPlayers: number;
  numSpectators: number;
  status: GAME_STATUS;
  genres: number[];
  playerSet?: number[];
}

export interface SignUpData {
  tokenAuth: {
    token: string;
  };
}

export enum CardType {
  PICK1 = '1',
  PICK2 = '2',
  ANSWER = '3',
}

export interface Definition {
  kind: string;
  operation?: string;
}

export type CanActivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export type CanLoadType = Observable<boolean> | Promise<boolean> | boolean;

export interface AuthUser {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Seo Meta Attribute
 *
 * @export
 * @enum {number}
 */
export enum SeoMetaTagAttr {
  name = 'name',
  property = 'property',
}

export interface SeoMetaTag {
  attr: SeoMetaTagAttr;
  attrValue: string;
  value?: string;
}

export interface SeoData {
  title?: string;
  keywords?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  section?: string;
  published?: string;
  modified?: string;
}

export interface ConfirmDialogData extends AnyObject {
  title: string;
  description?: string;
}

export type MatFabMenuDirection = 'top' | 'bottom' | 'left' | 'right';

export type FabMenuLayout = 'flex-column' | 'flex-column-reverse' | 'flex-row' | 'flex-row-reverse';

export type FabMenuLayoutDirections = { [key in MatFabMenuDirection]: FabMenuLayout };

export type CahPallette = ThemePalette | 'pending' | 'approved' | 'admin-approved' | 'success' | 'warning' | 'danger' | 'queued' | 'info';

export interface MatFabMenu {
  id: string | number;
  icon?: string; // please use either icon or imgUrl
  iconColor?: ThemePalette;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
  color?: CahPallette;
  imgUrl?: string;
  directives?: {
    cahConfirmDialog?: {
      component?: any;
      config: MatDialogConfig;
      confirmClick?: Function;
    };
    cahDialogComponent?: {
      component: any;
      config: MatDialogConfig;
    };
  };
}

export type PlayType = 'create' | 'join';

// TODO: use more specific type if https://github.com/microsoft/TypeScript/issues/41160 lands
export type RGBAColor = `#${string}`;

export interface Timer {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

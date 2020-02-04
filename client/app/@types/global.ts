import { Observable } from 'rxjs'
import { UrlTree } from '@angular/router'

/**
 * Card Type Enum
 *
 * @export
 * @enum {number}
 */
export enum CardType {
  PICK1 = '1',
  PICK2 = '2',
  ANSWER = '3'
}


export interface Definintion {
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

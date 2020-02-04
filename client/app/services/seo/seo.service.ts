import { Injectable, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { Meta, Title } from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter, map, catchError } from 'rxjs/operators'
import { SeoData, SeoMetaTag } from '../../@types/global'
import { environment } from '../../../environments/environment'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private readonly document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  start() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => route.firstChild ? route.firstChild : route),
      filter(route => route.outlet === 'primary'),
      map(this.setMeta.bind(this)),
      catchError(() => of(null))
    ).subscribe()
  }

  setMeta(route: ActivatedRoute) {
    return this.setData(route.snapshot.data['seo'])
  }

  setData(data: SeoData = {}): void {
    this.setSection(data.section)
    this.setKeywords(data.keywords)
    this.setTitle(data.title)
    this.setType(data.type)
    this.setDescription(data.description)
    this.setImage(data.image)
    this.setUrl(data.url)
    this.setPublished(data.published)
    this.setModified(data.modified)
    this.setAuthor(data.author)
  }

  setKeywords(keywords?: string): HTMLMetaElement | void {
    return keywords ? this.meta.updateTag({ name: 'keywords', content: keywords }) : this.meta.removeTag("name='keywords'")
  }

  setSection(section?: string): HTMLMetaElement | void {
    return section ? this.meta.updateTag({ name: 'article:section', content: section }) : this.meta.removeTag("name='article:section'")
  }

  setTitle(title: string = environment.APP_TITLE): void {
    const metas = ['twitter:title', 'twitter:image:alt', 'og:image:alt', 'og:title', 'title']
    this.title.setTitle(`CAH: ${title}`)
    return metas.forEach(name => this.meta.updateTag({ name, content: `CAH: ${title}` }))
  }

  setType(type?: string) {
    return type ? this.meta.updateTag({ property: 'og:type', content: type }) : this.meta.removeTag("property='og:type'")
  }

  setDescription(description?: string) {
    const metas = ['twitter:description', 'og:description', 'description']
    return description
      ? metas.forEach(name => this.meta.updateTag({ name, content: description }))
      : metas.forEach(name => this.meta.removeTag(`name='${name}'`))
  }

  setImage(image?: string) {
    if (image && image.length) {
      this.meta.updateTag({ name: 'twitter:image', content: image })
      this.meta.updateTag({ property: 'og:image', content: image })
      this.meta.updateTag({ property: 'og:image:height', content: '630' })
    } else {
      this.meta.removeTag("name='twitter:image'")
      this.meta.removeTag("property='og:image'")
      this.meta.removeTag("property='og:image:height'")
    }
  }

  setUrl(url?: string) {
    if (url && url.length) {
      this.meta.updateTag({ property: 'og:url', content: url })
    } else {
      this.meta.removeTag("property='og:url'")
    }
    this.setCanonicalUrl(url)
  }

  setPublished(publishedDateString?: string) {
    if (publishedDateString) {
      const publishedDate = new Date(publishedDateString)
      this.meta.updateTag({ name: 'article:published_time', content: publishedDate.toISOString() })
      this.meta.updateTag({ name: 'published_date', content: publishedDate.toISOString() })
    } else {
      this.meta.removeTag("name='article:published_time'")
      this.meta.removeTag("name='publication_date'")
    }
  }

  setModified(modifiedDateString?: string) {
    if (modifiedDateString) {
      const modifiedDate = new Date(modifiedDateString)
      this.meta.updateTag({ name: 'article:modified_time', content: modifiedDate.toISOString() })
      this.meta.updateTag({ name: 'og:updated_time', content: modifiedDate.toISOString() })
    } else {
      this.meta.removeTag("name='article:modified_time'")
      this.meta.removeTag("name='og:updated_time'")
    }
  }

  setAuthor(author?: string) {
    if (author && author.length) {
      this.meta.updateTag({ name: 'article:author', content: author })
      this.meta.updateTag({ name: 'author', content: author })
    } else {
      this.meta.removeTag("name='article:author'")
      this.meta.removeTag("name='author'")
    }
  }

  setTwitterSiteCreator(site?: string): void {
    if (Boolean(site)) {
      this.meta.updateTag({ name: 'twitter:site', content: site })
      this.meta.updateTag({ name: 'twitter:creator', content: site })
    } else {
      this.meta.removeTag("name='twitter:site'")
      this.meta.removeTag("name='twitter:creator'")
    }
  }

  setTwitterCard(card?: string): void {
    if (Boolean(card)) {
      this.meta.updateTag({ name: 'twitter:card', content: card })
    } else {
      this.meta.removeTag("name='twitter:card'")
    }
  }

  setFbAppId(appId?: string): void {
    if (Boolean(appId)) {
      this.meta.updateTag({ property: 'fb:app_id', content: appId })
    } else {
      this.meta.removeTag("property='fb:app_id'")
    }
  }

  setMetaTag(metaTag: SeoMetaTag): void {
    if (Boolean(metaTag.value)) {
      const metaTagObject = {
        [metaTag.attr]: metaTag.attrValue,
        content: metaTag.value,
      }
      this.meta.updateTag(metaTagObject)
    } else {
      const selector = `${metaTag.attr}='${metaTag.attrValue}'`
      this.meta.removeTag(selector)
    }
  }

  setMetaTags(metaTags: SeoMetaTag[]): void {
    for (const metaTag of metaTags) {
      this.setMetaTag(metaTag)
    }
  }

  setCanonicalUrl(url?: string) {
    // first remove potential previous url
    const selector = "link[rel='canonical']"
    const canonicalElement = this.document.head.querySelector(selector)
    if (canonicalElement) {
      this.document.head.removeChild(canonicalElement)
    }

    if (url && url.length) {
      const link: HTMLLinkElement = this.document.createElement('link')
      link.setAttribute('rel', 'canonical')
      this.document.head.appendChild(link)
      link.setAttribute('href', url)
    }
  }
}

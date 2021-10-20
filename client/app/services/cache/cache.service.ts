import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage-angular'
import { Apollo } from 'apollo-angular'
import { IonicStorageWrapper, persistCache } from 'apollo3-cache-persist'

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(private apollo: Apollo, private readonly storage: Storage) { }

  async init() {
    return this.storage.create().then(store => persistCache({
      cache: this.apollo.client.cache,
      storage: new IonicStorageWrapper(store)
    }))
  }
}

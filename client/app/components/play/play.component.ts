import { Component } from '@angular/core'
import { GameService } from '../../services/game/game.service'
import { Observable, of, from } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, filter, map, flatMap } from 'rxjs/operators'

@Component({
  selector: 'cah-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  genres: any[]
  query = this.gameService.selectGameGenre()
  // genreSubscription = this.query.valueChanges.subscribe(genres => this.genres = genres)

  constructor(private gameService: GameService) {
    this.query.startPolling(1000)
  }

  search(term$: Observable<string>) {
    return term$.pipe(
      filter(term => term.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      flatMap((search) => this.query.refetch({ search, first: 10 })),
      tap(console.log),
      map(genres => genres.data['allGenres'].edges),
      catchError(() => of([]))
    )
  }
}

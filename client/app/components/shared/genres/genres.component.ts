import { ScrollDispatcher } from '@angular/cdk/scrolling'
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling/virtual-scroll-viewport'
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core'
import { Genre, TRelayEdge } from 'client/app/@types/global'
import { skip, Subscription } from 'rxjs'
import { filter } from 'rxjs/internal/operators/filter'
import { tap } from 'rxjs/internal/operators/tap'
import { GenreService } from '../../../services/genre/genre.service'


@Component({
  selector: 'cah-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresComponent implements AfterViewInit, OnDestroy {
  @ViewChild('selectGenreCdk') selectGenreVirtualScroll!: CdkVirtualScrollViewport;
  pageSize = 10
  private genreQuery$ = this.gameService.fetchGenres({ first: this.pageSize })
  genres$ = this.genreQuery$.valueChanges
  selectGenreVirtualScroll$ = this.scrollDispatcher.scrolled().pipe(
    skip(1),
    // tap(() => console.log(this.selectGenreVirtualScroll.getDataLength(), this.selectGenreVirtualScroll.measureScrollOffset('bottom'))),
    filter(() => this.selectGenreVirtualScroll.measureScrollOffset('bottom') === 0),
    filter(() => this.genreQuery$.getCurrentResult().data.allGenres.pageInfo?.hasNextPage === true),
    tap(() => this.loadMoreGenres())
  )
  selectGenreVirtualScrollSubscription!: Subscription

  constructor(
    private gameService: GenreService,
    private scrollDispatcher: ScrollDispatcher
  ) { }

  ngAfterViewInit() {
    this.selectGenreVirtualScrollSubscription = this.selectGenreVirtualScroll$.subscribe()
  }

  ngOnDestroy() {
    this.selectGenreVirtualScrollSubscription.unsubscribe()
  }

  loadMoreGenres() {
    console.log(this.genreQuery$.getCurrentResult().data.allGenres.edges)
    return this.genreQuery$.fetchMore({
      variables: { after: this.genreQuery$.getCurrentResult().data.allGenres.pageInfo?.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          ...fetchMoreResult,
          allGenres: {
            ...prev.allGenres,
            ...fetchMoreResult?.allGenres
          }
        }
      }
    })
  }

  genreSelected(genre: Genre): boolean {
    return genre.selected
  }

  selectedGenres(genres: TRelayEdge<Genre>[] = []) {
    return genres.filter(({ node: { selected } }) => selected)
  }

  selectGenre(selected: boolean, genre: Genre) {
    return this.gameService.updateGenre({ ...genre, selected })
  }
}

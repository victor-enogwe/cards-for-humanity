import { BreakpointObserver } from '@angular/cdk/layout';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling/virtual-scroll-viewport';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Genre, TRelayEdge } from 'client/app/@types/global';
import { GameService } from 'client/app/services/game/game.service';
import { first, map, skip, Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { GenreService } from '../../../services/genre/genre.service';

@Component({
  selector: 'cah-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') class = 'd-flex flex-column flex-grow-1 flex-fill w-100';
  @ViewChild('selectGenreCdk') selectGenreVirtualScroll!: CdkVirtualScrollViewport;
  genreOptionsForm = this.formBuilder.group({
    genres: new FormControl('', [Validators.required, Validators.maxLength(5)]),
  });
  gameOptionsForm = this.formBuilder.group({
    rounds: new FormControl(5, [Validators.required, Validators.min(5), Validators.max(50)]),
    roundTime: new FormControl(10, [Validators.required, Validators.min(10), Validators.max(60)]),
    numPlayers: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    numSpectators: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
  });
  pageSize = 10;
  private genreQuery$ = this.genreService.fetchGenres({ first: this.pageSize });
  genres$ = this.genreQuery$.valueChanges;
  breakpointObserver$ = this.breakpointObserver
    .observe('(min-width: 560px)')
    .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  createNewGameOptions$ = this.gameOptionsForm.valueChanges.pipe(tap((data) => this.gameService.createGameCache(data)));
  selectGenreVirtualScroll$ = this.scrollDispatcher.scrolled().pipe(
    skip(1),
    // tap(() => console.log(this.selectGenreVirtualScroll.getDataLength(), this.selectGenreVirtualScroll.measureScrollOffset('bottom'))),
    filter(() => this.selectGenreVirtualScroll.measureScrollOffset('bottom') === 0),
    filter(() => this.genreQuery$.getCurrentResult().data.genres.pageInfo?.hasNextPage === true),
    tap(() => this.loadMoreGenres()),
  );
  selectedGenres: TRelayEdge<Genre>[] = [];
  selectGenreVirtualScrollSubscription!: Subscription;
  newGameOptionsSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private gameService: GameService,
    private scrollDispatcher: ScrollDispatcher,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.genreQuery$.valueChanges
      .pipe(
        first(({ data: { genres } }) => genres?.edges !== undefined),
        map(
          ({
            data: {
              genres: { edges },
            },
          }) => edges?.filter(({ node: { selected } }) => selected) ?? [],
        ),
        map((genres) => genres.map(({ node }) => node)),
        tap((genres) => this.genreOptionsForm.controls.genres.setValue(genres)),
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.selectGenreVirtualScrollSubscription = this.selectGenreVirtualScroll$.subscribe();
    this.newGameOptionsSubscription = this.createNewGameOptions$.subscribe();
  }

  ngOnDestroy() {
    this.selectGenreVirtualScrollSubscription.unsubscribe();
    this.newGameOptionsSubscription.unsubscribe();
  }

  loadMoreGenres() {
    console.log(this.genreQuery$.getCurrentResult().data.genres.edges);
    return this.genreQuery$.fetchMore({
      variables: { after: this.genreQuery$.getCurrentResult().data.genres.pageInfo?.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          ...fetchMoreResult,
          genres: {
            ...prev.genres,
            ...fetchMoreResult?.genres,
          },
        };
      },
    });
  }

  genreSelected(genre: Genre): boolean {
    return genre.selected;
  }

  toggleGenre(selected: boolean, genre: Genre) {
    return this.genreService.updateGenre({ ...genre, selected });
  }

  async resetGenres(genres: TRelayEdge<Genre>[] = []) {
    await Promise.all(genres.map((genre) => this.toggleGenre(false, genre.node)));
    this.genreOptionsForm.reset();
  }

  resetGameOptions() {
    this.gameOptionsForm.setValue({
      rounds: 5,
      roundTime: 10,
      numPlayers: 1,
      numSpectators: 1,
    });
  }

  createGame() {}
}

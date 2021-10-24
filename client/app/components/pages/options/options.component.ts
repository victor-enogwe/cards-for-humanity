import { BreakpointObserver } from '@angular/cdk/layout';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling/virtual-scroll-viewport';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Genre, TRelayEdge } from 'client/app/@types/global';
import { NewGameNode } from 'client/app/@types/graphql';
import { GameService } from 'client/app/services/game/game.service';
import omit from 'lodash.omit';
import { first, map, skip, Subscription, switchMap, zip } from 'rxjs';
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
    genres: new FormControl([], [Validators.required, Validators.maxLength(5)]),
  });
  gameOptionsForm = this.formBuilder.group({
    genres: new FormControl([], [Validators.required, Validators.maxLength(5)]),
    rounds: new FormControl(5, [Validators.required, Validators.min(5), Validators.max(50)]),
    roundTime: new FormControl(10, [Validators.required, Validators.min(10), Validators.max(60)]),
    numPlayers: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    numSpectators: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
  });
  pageSize = 10;
  private genreQuery$ = this.genreService.fetchGenres({ first: this.pageSize });
  private gameOptionsQuery$ = this.gameService.fetchGameOptions({ id: 1 });
  genres$ = this.genreQuery$.valueChanges;
  breakpointObserver$ = this.breakpointObserver
    .observe('(min-width: 560px)')
    .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  createNewGameOptions$ = this.gameOptionsForm.valueChanges.pipe(switchMap((data) => this.gameService.createNewGame(data)));
  selectGenreVirtualScroll$ = this.scrollDispatcher.scrolled().pipe(
    skip(1),
    filter(() => this.selectGenreVirtualScroll.measureScrollOffset('bottom') === 0),
    filter(() => this.genreQuery$.getCurrentResult().data.genres.pageInfo?.hasNextPage === true),
    tap(() => this.loadMoreGenres()),
  );
  selectedGenres: TRelayEdge<Genre>[] = [];
  selectGenreVirtualScrollSubscription!: Subscription;
  newGameOptionsSubscription!: Subscription;
  newGameDefaultOptions: Omit<NewGameNode, 'id' | 'status'> = { numPlayers: 1, roundTime: 10, rounds: 5, genres: [], numSpectators: 1 };
  newGameDefaultOptions$ = zip(
    this.genreQuery$.valueChanges.pipe(
      first(({ data: { genres } }) => genres?.edges !== undefined),
      map(
        ({
          data: {
            genres: { edges },
          },
        }) => edges?.filter(({ node: { selected } }) => selected) ?? [],
      ),
      map((genres) => genres.map(({ node }) => node)),
    ),
    this.gameOptionsQuery$.valueChanges.pipe(
      first(),
      map(({ data: { newGame } }) => newGame),
    ),
  );

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private gameService: GameService,
    private scrollDispatcher: ScrollDispatcher,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.newGameDefaultOptions$
      .pipe(
        tap(([genres]) => this.genreOptionsForm.controls.genres.setValue(genres)),
        tap(([genres, options]) =>
          this.gameOptionsForm.setValue(
            omit({ ...this.newGameDefaultOptions, ...options, genres: genres.map(({ id }) => id) }, ['__typename']),
          ),
        ),
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

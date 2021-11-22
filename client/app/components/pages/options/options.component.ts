import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling/virtual-scroll-viewport';
import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import omit from 'lodash.omit';
import { first, map, Observable, skip, Subscription, switchMap, zip } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { Avatar, Genre, TRelayEdge } from '../../../@types/global';
import { CreateGameInput, NewGameNode } from '../../../@types/graphql';
import { AuthService } from '../../../services/auth/auth.service';
import { GameService } from '../../../services/game/game.service';
import { GenreService } from '../../../services/genre/genre.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('selectGenreCdk') selectGenreVirtualScroll!: CdkVirtualScrollViewport;
  playType: 'join' | 'create' | undefined;
  avatar!: Avatar | undefined;
  defaultJoinPeriod = new Date(new Date(Date.now()).getTime() + 600000);
  newGameDefaultOptions: Omit<NewGameNode, 'status'> = {
    id: 'newGame',
    numPlayers: 1,
    roundTime: 10,
    rounds: 5,
    genres: [],
    numSpectators: 1,
    joinEndsAt: this.defaultJoinPeriod,
  };
  gameOptionsForm = this.formBuilder.group({
    id: new FormControl(this.newGameDefaultOptions.id),
    genres: new FormControl(this.newGameDefaultOptions.genres, [Validators.required, Validators.maxLength(5)]),
    rounds: new FormControl(this.newGameDefaultOptions.rounds, [Validators.required, Validators.min(5), Validators.max(50)]),
    roundTime: new FormControl(this.newGameDefaultOptions.roundTime, [Validators.required, Validators.min(10), Validators.max(60)]),
    numPlayers: new FormControl(this.newGameDefaultOptions.numPlayers, [Validators.required, Validators.min(0), Validators.max(9)]),
    numSpectators: new FormControl(this.newGameDefaultOptions.numSpectators, [Validators.required, Validators.min(0), Validators.max(10)]),
    joinEndsAt: new FormControl(this.newGameDefaultOptions.joinEndsAt, [Validators.required, Validators.min(10), Validators.max(60)]),
  });
  pageSize = 10;
  private genreQuery$ = this.genreService.fetchGenres({ first: this.pageSize });
  private gameOptionsQuery$ = this.gameService.resolve();
  genres$ = this.genreQuery$.valueChanges;
  breakpointObserver$: Observable<StepperOrientation> = this.uiService.isMobile$.pipe(
    map((matches) => (matches ? 'vertical' : 'horizontal')),
  );
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
    this.gameOptionsQuery$,
  );

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private gameService: GameService,
    private scrollDispatcher: ScrollDispatcher,
    private uiService: UIService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.newGameDefaultOptions$
      .pipe(
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

  resetGameOptions() {
    this.gameOptionsForm.setValue(this.newGameDefaultOptions);
  }

  joinGame() {}

  createGame(game: CreateGameInput) {
    console.log(game);
    this.gameService.createGame({ ...game, playerSet: [this.authService.profile$.value?.sub?.toString()!] });
  }

  selectAvatar(avatar: Avatar) {
    this.avatar = avatar;
  }

  clearAvatarSelection() {
    this.avatar = undefined;
  }
}

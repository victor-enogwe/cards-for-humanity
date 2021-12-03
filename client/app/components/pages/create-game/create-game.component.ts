import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import omit from 'lodash.omit';
import { lastValueFrom, Subscription, switchMap } from 'rxjs';
import { Avatar, Genre, PlayType } from '../../../@types/global';
import { CreateGameInput, NewGameNode } from '../../../@types/graphql';
import { GameService } from '../../../services/game/game.service';
import { GenreService } from '../../../services/genre/genre.service';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGameComponent implements OnInit, OnDestroy {
  pageSize = 10;
  playType: PlayType = this.router.getCurrentNavigation()?.extras?.state?.playType;
  avatar?: Avatar = this.uiService.avatars.find(({ name }) => name === this.router.getCurrentNavigation()?.extras.state?.avatar);
  defaultJoinPeriod = new Date(new Date(Date.now()).getTime() + 600000);
  private genreQuery$ = this.genreService.fetchGenres({ first: this.pageSize });
  genres$ = this.genreQuery$.valueChanges;
  newGameDefaultOptions: Omit<NewGameNode, 'status'> = {
    id: 'newGame',
    numPlayers: 1,
    roundTime: 10,
    rounds: 5,
    genres: [],
    numSpectators: 1,
    ...omit(this.route.snapshot.data?.newGame, '__typename'),
    joinEndsAt: this.defaultJoinPeriod,
    avatar: this.avatar?.name!,
  };
  gameOptionsForm = this.formBuilder.group({
    id: new FormControl(this.newGameDefaultOptions.id),
    genres: new FormControl(this.newGameDefaultOptions.genres, [Validators.required, Validators.maxLength(5)]),
    rounds: new FormControl(this.newGameDefaultOptions.rounds, [Validators.required, Validators.min(5), Validators.max(50)]),
    roundTime: new FormControl(this.newGameDefaultOptions.roundTime, [Validators.required, Validators.min(10), Validators.max(60)]),
    numPlayers: new FormControl(this.newGameDefaultOptions.numPlayers, [Validators.required, Validators.min(0), Validators.max(9)]),
    numSpectators: new FormControl(this.newGameDefaultOptions.numSpectators, [Validators.required, Validators.min(0), Validators.max(10)]),
    joinEndsAt: new FormControl(this.newGameDefaultOptions.joinEndsAt, [Validators.required, Validators.min(10), Validators.max(60)]),
    avatar: new FormControl(this.newGameDefaultOptions.avatar, [Validators.required]),
  });
  gameOptionsChanges$ = this.gameOptionsForm.valueChanges.pipe(switchMap((input) => this.gameService.createNewGame(input)));
  gameOptionsChangesSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private genreService: GenreService,
    private gameService: GameService,
    private uiService: UIService,
  ) {}

  ngOnInit(): void {
    this.gameOptionsChangesSubscription = this.gameOptionsChanges$.subscribe();
    this.gameOptionsForm.setValue(this.newGameDefaultOptions);
  }

  ngOnDestroy(): void {
    this.gameOptionsChangesSubscription.unsubscribe();
  }

  toggleGenre(selected: boolean, genre: Genre) {
    return this.genreService.updateGenre({ ...genre, selected });
  }

  resetGameOptions() {
    this.gameOptionsForm.setValue(this.newGameDefaultOptions);
  }

  createGame(game: CreateGameInput) {
    lastValueFrom(this.gameService.createGame({ ...omit(game, 'id', 'avatar') }));
  }
}

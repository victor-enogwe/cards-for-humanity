import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Avatar } from '../../../@types/global';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cfh-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onAvatarSelect = new EventEmitter<Avatar | null | undefined>();
  @Input() selected?: Avatar['name'];
  @Input() taken?: Avatar['name'][];
  @ViewChildren('avatarDiv') images!: QueryList<HTMLImageElement & Highlightable>;
  avatars = this.uiService.avatars;
  avatar$ = new BehaviorSubject<Avatar | null | undefined>(null);
  avatarSubscription!: Subscription;
  private keyBoardEventsManager!: ActiveDescendantKeyManager<HTMLImageElement>;

  constructor(private uiService: UIService) {}

  ngOnInit(): void {
    this.avatarSubscription = this.avatar$.asObservable().subscribe((avatar) => this.onAvatarSelect.emit(avatar));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const selected = changes?.selected;
    const taken = changes?.taken;
    if (selected) {
      this.avatar$.next(this.avatars.find(({ name }) => name === selected.currentValue));
    }
    if (taken) {
      this.avatars = this.avatars.filter((avatar) => !taken.currentValue?.includes(avatar.name));
    }
  }

  ngOnDestroy(): void {
    this.avatarSubscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.keyBoardEventsManager = new ActiveDescendantKeyManager(this.images).withWrap();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event$: KeyboardEvent) {
    event$.stopImmediatePropagation();
    if (!this.keyBoardEventsManager) return;

    switch (event$.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.keyBoardEventsManager.onKeydown(event$);
        return false;
      case 'Enter':
        this.keyBoardEventsManager.activeItem?.parentElement?.click();
        return false;
      default:
        return false;
    }
  }
}

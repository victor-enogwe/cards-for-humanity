import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { STATIC_URL } from '../../../modules/cah/cah.module';

@Component({
  selector: 'cah-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements AfterContentInit {
  @ViewChildren('avatarDiv') images!: QueryList<HTMLImageElement & Highlightable>;
  @Output() avatarSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() selected!: string;
  private keyBoardEventsManager!: ActiveDescendantKeyManager<HTMLImageElement>;
  avatars = [
    'abby',
    'alfred',
    'andina',
    'astro',
    'camile',
    'dorothy',
    'dudai',
    'eduardo',
    'general',
    'grace',
    'iranir',
    'jennifer',
    'labrat',
    'luther',
    'rainbowness',
    'shin',
  ].map((name) => `${this.staticURL}assets/img/avatars/${name}.gif`);

  constructor(@Inject(STATIC_URL) private staticURL: string) {}

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

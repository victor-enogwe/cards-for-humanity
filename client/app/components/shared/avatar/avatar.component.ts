import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Avatar } from '../../../@types/global';
import { UIService } from '../../../services/ui/ui.service';

@Component({
  selector: 'cah-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements AfterContentInit {
  @ViewChildren('avatarDiv') images!: QueryList<HTMLImageElement & Highlightable>;
  @Output() avatarSelected: EventEmitter<Avatar> = new EventEmitter<Avatar>();
  @Input() selectedAvatar!: Avatar | undefined;
  private keyBoardEventsManager!: ActiveDescendantKeyManager<HTMLImageElement>;
  avatars = this.uiService.avatars;

  constructor(private uiService: UIService) {}

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

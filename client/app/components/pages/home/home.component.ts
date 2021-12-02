import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { MatFabMenu } from '../../../@types/global';
import { UIService } from '../../../services/ui/ui.service';
import { InstructionsComponent } from '../../shared/instructions/instructions.component';

@Component({
  selector: 'cah-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  isMobile$ = this.uiService.isMobile$.pipe(map((value) => (value ? 'true' : 'false')));
  playFabMenu: MatFabMenu[] = [
    {
      id: 'play_game',
      icon: 'videogame_asset',
      tooltip: 'Play Game',
      tooltipPosition: 'left',
      color: 'primary',
    },
    {
      id: 'show_instructions',
      icon: 'quiz',
      tooltip: 'How To Play',
      tooltipPosition: 'left',
      color: 'accent',
      directives: {
        cahDialogComponent: {
          component: InstructionsComponent,
          config: { data: { showDialogClose: true } },
        },
      },
    },
  ];

  constructor(private uiService: UIService, private router: Router) {}

  ngAfterViewInit(): void {
    lastValueFrom(this.uiService.setFullWidth({ fullWidth: true }));
  }

  ngOnDestroy(): void {
    lastValueFrom(this.uiService.setFullWidth({ fullWidth: false }));
  }

  fabItemClicked($event: string | number) {
    switch ($event) {
      case 'play_game':
        return this.router.navigate(['auth']);
      default:
        return;
    }
  }
}

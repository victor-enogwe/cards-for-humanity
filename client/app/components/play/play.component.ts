import { Component, OnInit } from '@angular/core'
import { GameService } from '../../services/game/game.service'

@Component({
  selector: 'cah-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  genres: any

  constructor(private gameService: GameService) { }

  async ngOnInit() {
    this.genres = await this.gameService.selectGameGenre()
  }
}

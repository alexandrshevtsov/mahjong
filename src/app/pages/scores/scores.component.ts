import { Component } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';

@Component({
    selector: 'scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.scss']
})
export class ScoresComponent {

    constructor(playerService: PlayerService) {
        this.playerService = playerService;
    }

    private playerService: PlayerService;
}

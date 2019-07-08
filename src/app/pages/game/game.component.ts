import { Component } from '@angular/core';
import { GameService } from '../../services/game/game.service';

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent {

    constructor(gameService: GameService) {
        this.gameService = gameService;
        this.playerName = '';
    }

    cellClick = (row, column) => {
        if (this.gameService.shouldProcess())
            return;
        this.gameService.pickCell(row, column);
        if (this.gameService.shouldProcess())
            setTimeout(this.gameService.processSelected, 1500);
    }

    startClick = () => {
        this.gameService.init(this.playerName);
        this.playerName = '';
    }

    newGameClick = () => {
        this.gameService.reset();
    }

    private gameService: GameService;

    private playerName: string;
}

/*
 * Represents a logic to deal with a player
 * 
 */

import { Injectable } from '@angular/core';
import { PlayerModel } from '../../models/player.model';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {

    constructor() {
        this.model = [];
    }

    // returns list of all players ordered by better score (minimal steps to complete the game)
    list = () => this.model.concat().sort((a, b) => a.bestScore > b.bestScore ? 1 : -1);

    // creates or updates player info about the best score / number of finished games
    set = (name: string, score: number) => {
        let player = this.model.find(p => p.name === name);
        if (player) {
            if (score < player.bestScore)
                player.bestScore = score;
            player.gamesCount++;
        }
        else {
            player = new PlayerModel();
            player.name = name;
            player.bestScore = score;
            player.gamesCount = 1;
            this.model.push(player);
        }
    }

    private model: PlayerModel[];
}

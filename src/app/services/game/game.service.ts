/*
 * Game logic
 * 
 */

import { Injectable } from '@angular/core';
import { GameModel } from '../../models/game.model';
import { BoardCellModel } from '../../models/boardcell.model';
import { PlayerService } from '../player/player.service';

// board vertical dimention
const ROWS: number = 6;

// board horisontal dimention
const COLUMNS: number = 6;

// low range of cell values
const LOW_RANGE: number = 1;

// high range of cell values
const HIGH_RANGE: number = 99;

@Injectable({
    providedIn: 'root',
})
export class GameService {

    constructor(playerService: PlayerService) {
        this.playerService = playerService;
        this.model = null;
    }

    // initialises new game: initializes model and sets player/step/status field values,
    // initializes board and fills it with random unique pairs of number within given range
    init(playerName: string): void {
        let values: number[] = [];
        let valuesCount: number[] = new Array(ROWS * COLUMNS / 2);
        this.randomValues(values, ROWS * COLUMNS / 2);
        this.model = new GameModel();
        this.model.player = playerName;
        this.model.step = 0;
        this.model.board = [];
        for (let i = 0; i < ROWS; i++) {
            let row = [];
            this.model.board[i] = row;
            for (let j = 0; j < COLUMNS; j++) {
                let cell = new BoardCellModel();
                let valueIndex;
                while(true) {
                    valueIndex = Math.floor(Math.random() * ROWS * COLUMNS / 2);
                    if (!valuesCount[valueIndex])
                        valuesCount[valueIndex] = 0;
                    if (valuesCount[valueIndex] < 2)
                        break;
                }
                cell.value = values[valueIndex];
                valuesCount[valueIndex] += 1;
                cell.status = 'Hidden';
                row[j] = cell;
            }
        }
        this.model.selected = [];
        this.setGameStatus();
    }

    // an auxilary method to get random unique values for a half of board (assuming we have pairs of unique values)
    randomValues = (arr: number[], length: number) => {
        while (arr.length < length) {
            let val = Math.floor(Math.random() * HIGH_RANGE) + LOW_RANGE;
            if (arr.some(x => x === val))
                continue;
            arr.push(val);
        }
    };

    // processes cell picking. handles only Hidden cells. Changes status of picked sell to pending
    pickCell = (row, column) => {
        let cell: BoardCellModel = this.model.board[row][column];
        if (cell.status !== 'Hidden')
            return;
        cell.status = 'Pending';
        this.model.selected.push(cell);
    }

    // handles picked cells on board: if they both have the same value set their status to Discovered and returns it to Hidden otherwise
    processSelected = () => {
        this.setGameStatus();
        if (!this.shouldProcess())
            return;
        let cell1 = this.model.selected[0];
        let cell2 = this.model.selected[1];
        if (cell1.value === cell2.value) {
            cell1.status = cell2.status = 'Discovered';
        }
        else {
            cell1.status = cell2.status = 'Hidden';
        }
        this.model.selected = [];
        this.model.step++;
        this.setGameStatus();
    }

    // indicates if board is ready to process (two cells are picked)
    shouldProcess = (): boolean => this.model.selected.length >= 2 && this.model.status !== 'Finished';

    // an auxillary method to check game status (if all the cells are discovered, set game status to 'Finished')
    setGameStatus = () => {
        if (this.model.board.every((row) => row.every((cell) => cell.status === 'Discovered'))) {
            this.model.status = 'Finished';
            this.playerService.set(this.model.player, this.model.step);
        }
        else
            this.model.status = 'Running';
    }

    // abandon current game
    reset = () => this.model = null;

    // game model
    public model: GameModel;

    private playerService: PlayerService
}

/*
 * Model for game session
 *
 */

import { BoardCellModel } from './boardcell.model';

export class GameModel {

    // Two-dimencional board of cells, should contain unique pairs
    public board: BoardCellModel[][];

    // player Nickname
    public player: string;

    // Game step
    public step: number;

    // An auxillary field. Contains currently selected (Pending) cells. Can contain 0, 1 or 2 cells only
    public selected: BoardCellModel[];

    // Game status: 'Running' / 'Finished'
    public status: string;
}

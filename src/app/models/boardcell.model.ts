/*
 * Represents single cell of gaming board
 * 
 */
export class BoardCellModel {

    // cell value 
    public value: number;

    // cell status: 'Hidden' / 'Pending' / 'Discovered'
    public status: string;
}

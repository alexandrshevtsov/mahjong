import { GameService } from './game.service';
import { PlayerService } from '../player/player.service';
import { BoardCellModel } from '../../models/boardcell.model';
import { GameModel } from '../../models/game.model';

describe('GameService.ctor', () => {
    let service: GameService;

    beforeEach(() => { service = new GameService(new PlayerService()); });

    it('#model should be empty after service creation', () => {
        expect(service.model).toBeNull();
    });
});

describe('GameService.init', () => {
    let service: GameService;
    let playerName: string = 'My Player';

    beforeEach(() => {
        service = new GameService(new PlayerService());
        service.init(playerName);
    });

    it('#init model after initialization should be defined', () => {
        expect(service.model).toBeDefined();
    });

    it('#init player should be the same as we pass into the method', () => {
        expect(service.model.player).toBe(playerName); // 
    });

    it('#init step counter after initialization should be zero', () => {
        expect(service.model.step).toBe(0);
    });

    it('#init board after initialization should be defined', () => {
        expect(service.model.board).toBeDefined();
    });

    it('#init board rows size check', () => {
        expect(service.model.board.length).toBe(6);
    });

    it('#init game initial status', () => {
        expect(service.model.status).toBe('Running');
    });

    it('#init each board cell should be hidden after initialization', () => {
        for (let i = 0; i < service.model.board.length; i++) {
            let row = service.model.board[i];
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                expect(cell.status).toBe('Hidden');
            }
        }
    });

    it('#init each board cell value should have a pair', () => {
        var valuesCount = {};
        for (let i = 0; i < service.model.board.length; i++) {
            let row = service.model.board[i];
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                if (!valuesCount[cell.value])
                    valuesCount[cell.value] = 0;
                valuesCount[cell.value]++;
            }
        }
        for (let key in valuesCount) {
            expect(valuesCount[key]).toBe(2);
        }
    });
});

describe('GameService.pickCell', () => {
    let service: GameService;
    let playerName: string = 'My Player';

    beforeEach(() => {
        service = new GameService(new PlayerService());
        service.init(playerName);
    });

    it('#pickCell status change', () => {
        let i: number = 0, j: number = 0;
        let cell = service.model.board[i][j];
        expect(cell.status).toBe('Hidden');
        service.pickCell(i, j);
        expect(cell.status).toBe('Pending');
    });

    it('#pickCell selected items length change', () => {
        expect(service.model.selected.length).toBe(0);
        service.pickCell(0, 0);
        expect(service.model.selected.length).toBe(1);
    });
});

describe('GameService.shouldProcess', () => {
    let service: GameService;
    let playerName: string = 'My Player';

    beforeEach(() => {
        service = new GameService(new PlayerService());
        service.init(playerName);
    });

    it('#shouldProcess after single pick', () => {
        service.pickCell(0, 0);
        expect(service.shouldProcess()).toBe(false);
    });

    it('#shouldProcess after two picks', () => {
        service.pickCell(0, 0);
        service.pickCell(0, 1);
        expect(service.shouldProcess()).toBe(true);
    });
});

describe('GameService.processSelected', () => {
    let service: GameService;
    let playerName: string = 'My Player';

    beforeEach(() => {
        service = new GameService(new PlayerService());
        service.init(playerName);
    });

    it('#processSelected after picking two cells with the same values', () => {
        let i1: number = 0, j1: number = 0, i2: number = -1, j2: number = -1;
        const model: GameModel = service.model;
        const cell1: BoardCellModel = model.board[i1][j1];
        let cell2;
        // find cell with the same value
        for (let i = 0; i < model.board.length; i++) {
            let row = model.board[i];
            let found: boolean = false;
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                if (!(i === i1 && j === j1) && cell.value === cell1.value) {
                    i2 = i;
                    j2 = j;
                    found = true;
                    break;
                }
            }
            if (found)
                break;
        }
        expect(i2).toBeGreaterThan(-1);
        expect(j2).toBeGreaterThan(-1);
        cell2 = model.board[i2][j2];
        expect(cell2).toBeDefined();
        let step = model.step;
        expect(cell1.status).toBe('Hidden');
        expect(cell2.status).toBe('Hidden');
        service.pickCell(i1, j1);
        service.pickCell(i2, j2);
        expect(cell1.status).toBe('Pending');
        expect(cell2.status).toBe('Pending');
        expect(service.shouldProcess()).toBe(true);
        service.processSelected();
        expect(cell1.status).toBe('Discovered');
        expect(cell2.status).toBe('Discovered');
        expect(model.step).toBe(step + 1);
    });

    it('#processSelected after picking two cells with different values', () => {
        let i1: number = 0, j1: number = 0, i2: number = -1, j2: number = -1;
        const model = service.model;
        let cell1: BoardCellModel = model.board[i1][j1];
        let cell2;
        // find first cell with different value
        for (let i = 0; i < model.board.length; i++) {
            let row = model.board[i];
            let found: boolean = false;
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                if (cell.value !== cell1.value) {
                    i2 = i;
                    j2 = j;
                    found = true;
                    break;
                }
            }
            if (found)
                break;
        }
        expect(i2).toBeGreaterThan(-1);
        expect(j2).toBeGreaterThan(-1);
        cell2 = model.board[i2][j2];
        expect(cell2).toBeDefined();
        const step = model.step;
        expect(cell1.status).toBe('Hidden');
        expect(cell2.status).toBe('Hidden');
        service.pickCell(i1, j1);
        service.pickCell(i2, j2);
        expect(cell1.status).toBe('Pending');
        expect(cell2.status).toBe('Pending');
        expect(service.shouldProcess()).toBe(true);
        service.processSelected();
        // after processing should return to Hidden again
        expect(cell1.status).toBe('Hidden');
        expect(cell2.status).toBe('Hidden');
        expect(model.step).toBe(step + 1);
    });
});

describe('GameService.setGameStatus', () => {
    let service: GameService;
    let playerName: string = 'My Player';

    beforeEach(() => {
        service = new GameService(new PlayerService());
        service.init(playerName);
    });

    it('#setGameStatus all discovered should lead to game finish', () => {
        const model: GameModel = service.model;
        // artificially set status of all the cells to Discovered
        for (let i = 0; i < model.board.length; i++) {
            let row = model.board[i];
            for (let j = 0; j < row.length; j++) {
                let cell: BoardCellModel = row[j];
                cell.status = 'Discovered';
            }
        }
        expect(model.status).toBe('Running');
        service.setGameStatus();
        expect(model.status).toBe('Finished');
    });
});

describe('GameService.reset', () => {
    let service: GameService;
    let playerName: string = 'My Player';

    beforeEach(() => {
        service = new GameService(new PlayerService());
        service.init(playerName);
    });

    it('#reset should purge model', () => {
        expect(service.model).toBeDefined();
        service.reset();
        expect(service.model).toBeNull();
    });
});

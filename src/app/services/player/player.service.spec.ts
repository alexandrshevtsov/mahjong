import { PlayerService } from './player.service';

describe('PlayerService', () => {
    let service: PlayerService;

    beforeEach(() => { service = new PlayerService(); });

    it('#set should increase list', () => {
        expect(service.list()).toBeDefined();
        expect(service.list().length).toBe(0);
        service.set('User1', 1);
        expect(service.list().length).toBe(1);
    });

    it('#list ordering', () => {
        expect(service.list()).toBeDefined();
        expect(service.list().length).toBe(0);
        service.set('User1', 7);
        service.set('User2', 2);
        service.set('User3', 5);
        expect(service.list().length).toBe(3);
        expect(service.list()[0].bestScore).toBe(2);
        expect(service.list()[1].bestScore).toBe(5);
        expect(service.list()[2].bestScore).toBe(7);
    });

    it('#set the same player should update existing row', () => {
        expect(service.list()).toBeDefined();
        expect(service.list().length).toBe(0);
        service.set('User1', 5);
        expect(service.list()[0].bestScore).toBe(5);
        expect(service.list().length).toBe(1);
        service.set('User1', 3);
        expect(service.list().length).toBe(1);
        expect(service.list()[0].bestScore).toBe(3);
        service.set('User1', 1);
        expect(service.list().length).toBe(1);
        expect(service.list()[0].bestScore).toBe(1);
        service.set('User1', 2);
        expect(service.list().length).toBe(1);
        expect(service.list()[0].bestScore).toBe(1);
    });
});

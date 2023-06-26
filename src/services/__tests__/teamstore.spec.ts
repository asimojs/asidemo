import { beforeEach, describe, expect, it } from 'vitest';
import { TeamStore } from '../types';
import { _createTeamStore } from '../teamstore';


describe('TeamStore', () => {
    let teamStore: TeamStore, data: TeamStore["data"];

    beforeEach(() => {
        teamStore = _createTeamStore();
        data = teamStore.data;
    });

    it('should properly initialize', async () => {
        expect(data.id).toBe(""); // team not yet initialized

        // TODO
    });

});


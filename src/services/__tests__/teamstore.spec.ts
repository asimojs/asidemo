import { beforeEach, describe, expect, it } from 'vitest';
import { TeamStore } from '../types';
import { EVT_INIT_COMPLETE, _createTeamStore } from '../teamstore';
import { mockEnv } from '../../mockenv';
import { trax } from '@traxjs/trax';
import '../../bundles';


describe('TeamStore', () => {
    let teamStore: TeamStore, data: TeamStore["data"];

    describe('Long list / Profile 1', () => {
        beforeEach(() => {
            mockEnv.setProfile(1, false);
            teamStore = _createTeamStore();
            data = teamStore.data;
        });

        it('should properly initialize', async () => {
            expect(data.id).toBe(""); // team not yet initialized

            await trax.log.awaitEvent(EVT_INIT_COMPLETE);

            expect(data.id).toBe("TS1");
            expect(data.name).toBe("The Simpsons");
            expect(data.members.length).toBe(5);

            const members = data.members.map(m => `[${m.id}] ${m.firstName} ${m.lastName}`);
            expect(members).toMatchObject([
                "[USR1] Homer Simpson",
                "[USR2] Marge Simpson",
                "[USR3] Bart Simpson",
                "[USR4] Lisa Simpson",
                "[USR5] Maggie Simpson",
            ])
        });
    });

    describe('Short list / Profile 2', () => {
        beforeEach(() => {
            mockEnv.setProfile(2, false);
            teamStore = _createTeamStore();
            data = teamStore.data;
        });

        it('should properly initialize', async () => {
            expect(data.id).toBe(""); // team not yet initialized

            await trax.log.awaitEvent(EVT_INIT_COMPLETE);

            expect(data.id).toBe("TS2");
            expect(data.name).toBe("The Simpsons (very very very very very very very very long name)");
            expect(data.members.length).toBe(2);

            const members = data.members.map(m => `[${m.id}] ${m.firstName} ${m.lastName}`);
            expect(members).toMatchObject([
                "[USR1] Homer Simpson",
                "[USR2] Marge Simpson"
            ])
        });
    });
});


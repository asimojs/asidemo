import { asm } from "@asimojs/asimo";
import { getFetch } from "./fetch";
import { FetchIID } from "../utils/types";
import { User } from "../api/types";

const profile = {
    teamId: "",
    teamName: "",
    users: {} as { [key: string]: User }
}

export class MockService {
    /** Mock Profile */
    private _profile: number = 1;
    /** Number of supported profiles */
    private _profileCount = 2;

    get profile() {
        return this._profile;
    }

    data: typeof profile = profile;

    setProfile(profileId: number, consoleInfo=true) {
        // min = 1, max = _profileCount
        if (profileId > 0 && profileId <= this._profileCount) {
            this._profile = profileId;
        }

        this.data = [profile1, profile2][this._profile - 1];

        asm.registerService(FetchIID, () => getFetch(this));
        consoleInfo && console.log('%c Mock Environment:%c profile #%d', 'color:#2d7bf0;font-weight:bold', 'color:orange', this._profile);
    }
}

export const mockEnv = new MockService();


const profile1 = {
    teamId: "TS1",
    teamName: "The Simpsons",
    users: {
        "USR1": { id: "USR1", firstName: "Homer", lastName: "Simpson" },
        "USR2": { id: "USR2", firstName: "Marge", lastName: "Simpson" },
        "USR3": { id: "USR3", firstName: "Bart", lastName: "Simpson" },
        "USR4": { id: "USR4", firstName: "Lisa", lastName: "Simpson" },
        "USR5": { id: "USR5", firstName: "Maggie", lastName: "Simpson" },
    } as { [key: string]: User }
}

const profile2 = {
    teamId: "TS2",
    teamName: "The Simpsons (very very very very very very very very long name)",
    users: {
        "USR1": { id: "USR1", firstName: "Homer", lastName: "Simpson" },
        "USR2": { id: "USR2", firstName: "Marge", lastName: "Simpson" },
    } as { [key: string]: User }
}

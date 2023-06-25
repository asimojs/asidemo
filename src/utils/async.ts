import { trax } from "@traxjs/trax";
import { useTraxState } from "@traxjs/trax-preact";

/**
 * Use an async resource
 * TODO: include in trax library
 * @param factory
 * @returns
 */
export function useAsyncValue<T>(factory: () => Promise<T>): { ready: false } | { ready: true; value: T } {
    const st = useTraxState({
        ready: false,
        promise: null as null | Promise<T>,
        value: null as null | T
    });

    return processAsyncState(st, factory) as any;
}


interface AsyncValueState<T> {
    ready: boolean;
    promise: null | Promise<T>;
    value: null | T;
}

function processAsyncState<T>(st: AsyncValueState<T>, factory: () => Promise<T>) {
    if (!st.ready && st.value) {
        st.ready = true;
        return st;
    } else {
        st.ready = false;
    }

    if (st.promise === null) {
        try {
            const p = st.promise = factory();

            if (p && typeof p.then === "function") {
                p.then((v: T) => {
                    st.ready = true;
                    st.value = v;
                    st.promise = null;
                });
            } else {
                // p is the return value
                st.ready = true;
                st.value = p as any;
                st.promise = null;
            }
        } catch (ex) {
            console.error(`[useAsyncRes] Error while calling factory: ${ex}`);
            st.promise = null;
            st.ready = false;
        }
    }
    return st;
}


interface AsyncDataMap {
    [key: string]: () => Promise<any>;
}

type AsyncDataRes<T extends AsyncDataMap> = {
    [P in keyof T]: () => {
        ready: boolean;
        value: null | (T[P] extends () => Promise<infer R> ? R : T[P]);
    }
}

/**
 * Load and cache data that need to be retrieved asynchronously
 * @param dataMap
 * @returns
 */
export function useAsyncData<T extends AsyncDataMap>(dataMap: T): AsyncDataRes<T> {
    const st = useTraxState({
        states: {} as {
            [k: string]: AsyncValueState<any>
        },
        res: null as null | AsyncDataRes<T>
    });

    if (st.res === null) {
        // init
        const states = st.states;
        const res: AsyncDataRes<T> = {} as any;
        Object.getOwnPropertyNames(dataMap).forEach(k => {
            (res as any)[k] = () => {
                let state = states[k];
                if (!state) {
                    states[k] = {
                        ready: false,
                        promise: null as null | Promise<any>,
                        value: null as null | any
                    }
                    state = states[k]; // state is a trax object
                }
                const st = processAsyncState(state, dataMap[k]);
                return st;
            }
        });
        st.res = res;
    }
    return st.res;
}

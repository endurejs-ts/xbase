import { produce } from 'immer';

class Xbase {
    static create<T>(initialState: (setState: (state: Partial<T>) => void) => T): () => T {
        let state = initialState((partialState) => {
            state = { ...state, ...partialState };
        });
        
        return () => state;
    }
}

export { Xbase as xbase };
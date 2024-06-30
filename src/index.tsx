import { produce } from 'immer';
import { useState, useEffect } from 'react';

type SetState<T> = (newState: Partial<T>) => void;
type GetState<T> = () => T;

interface Api<T> {
  set: SetState<T>;
  c: T;
}

export const xbase = {
  create: <T,>(initializer: (set: SetState<T>, c: T) => T) => {
    let state: T = {} as T;
    const listeners = new Set<() => void>();

    const setState: SetState<T> = (newState) => {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener());
    };

    const getState: GetState<T> = () => state;

    state = initializer(setState, state); // 초기화 시 state 사용

    const api: Api<T> = {
      set: setState,
      c: state,
    };

    const useStore = (): T => {
      const [, forceUpdate] = useState(0);

      useEffect(() => {
        const listener = () => forceUpdate((n) => n + 1);
        listeners.add(listener);
        return () => {
          listeners.delete(listener);
        };
      }, []);

      return state;
    };

    return useStore;
  },
};
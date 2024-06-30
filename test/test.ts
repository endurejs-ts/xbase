import { xbase } from '../src/index';

interface IBase {
    count: number,
    inc: () => void
}

const useStore = xbase.create<IBase>((set) => ({
    count: 0,
    inc: () => set({ count: + 1 }),
}));

const { count, inc } = useStore();

console.log(count);
inc();

console.log(count);
import { type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { create } from '../helpers/create';

type CounterState = {
	counter: number;
	persistedCounter: number;
};

type CounterActions = {
	increment: () => void;
	decrement: () => void;
	changeByAmound: (value: number) => void;
	resetStore: () => void;
};

const initialState = {
	counter: 0,
	persistedCounter: 0,
};

const counterSlice: StateCreator<CounterState & CounterActions, [['zustand/persist', unknown]]> = (
	set,
	get
) => ({
	counter: 0,
	persistedCounter: 0, // 'counterStore' zustand/persist will persist this value on the browser's local storage
	resetStore: () => {
		set(initialState);
	},
	increment: () => {
		const { counter, persistedCounter } = get();
		set({ counter: counter + 1, persistedCounter: persistedCounter + 1 }); // set(state => ({...state, counter: state.counter + 1}))
	},
	decrement: () => {
		const { counter, persistedCounter } = get();
		set({ counter: counter - 1, persistedCounter: persistedCounter - 1 }); // set((state) => ({ ...state, counter: state.counter - 1 }));
	},
	changeByAmound: (value: number) => {
		const { counter } = get();
		set({ counter: counter + value });
	},
});

export const useCounterStore = create<CounterState & CounterActions>()(
	persist(counterSlice, {
		name: 'counterStore',
		partialize: (state) => ({ persistedCounter: state.persistedCounter }),
	})
);

export const changeByAmound = (value: number) => useCounterStore.getState().changeByAmound(value);
export const getCounter = () => useCounterStore.getState().counter;

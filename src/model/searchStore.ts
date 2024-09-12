import { create } from 'zustand';
import { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getCoffeeList } from './coffeeStore';

type SearchState = {
	text?: string;
};

type SearchActions = {
	setText: (text: string) => void;
};

const searchSlice: StateCreator<
	SearchState & SearchActions,
	[
		['zustand/devtools', never]
		// ['zustand/persist', unknown]
	]
> = (set) => ({
	text: '',
	setText: (text) => {
		set({ text }, false, 'setText');
	},
});

export const useSearchStore = create<SearchActions & SearchState>()(
	devtools(searchSlice, { name: 'searchStore' })
);

useSearchStore.subscribe((state, prevState) => {
	if (state.text !== prevState.text) {
		getCoffeeList({ text: state.text });
	}
});

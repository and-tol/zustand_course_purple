import axios from 'axios';
import { StateCreator } from 'zustand';
import { BASE_URL } from '../api/coreApi';
import { CartActions, CoffeeCartState, CoffeeListActions, ListState } from '../types/store.type';

export const listSlice: StateCreator<
	CartActions & CoffeeCartState & CoffeeListActions & ListState,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	CoffeeListActions & ListState
> = (set, get) => ({
	controller: undefined,
	address: undefined,
	params: {
		text: undefined,
	},
	setParams: (newParams) => {
		const { getCoffeeList, params } = get();
		set({ params: { ...params, ...newParams } }, false, 'setPArams');
		getCoffeeList(params);
	},
	getCoffeeList: async (params) => {
		const { controller } = get();
		if (controller) {
			controller.abort();
		}
		const newController = new AbortController();
		set({ controller: newController });
		const { signal } = newController;

		const { data } = await axios.get(BASE_URL, { params, signal });
		return data;
	},
});

import { StateCreator } from 'zustand';
import { CartActions, CartState, ListActions, ListState } from '../types/store.type';
import axios from 'axios';
import {BASE_URL} from '../api/coreApi';

export const listSlice: StateCreator<
	CartActions & CartState & ListActions & ListState,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	ListActions & ListState
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
		try {
			const { data } = await axios.get(BASE_URL, { params, signal });
			set({ coffeeList: data });
		} catch (error) {
			if (axios.isCancel(error)) return;
			console.error(error);
		}
	},
});

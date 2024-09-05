// method of collect all the methods of reset stores

import { StateCreator } from 'zustand';

import { create as _create } from 'zustand';

const resetStoreFnSet = new Set<() => void>();
export const resetAllStores = () => resetStoreFnSet.forEach(f => f());

export const create = (<T>() => {
	return (stateCreator: StateCreator<T>) => {
		const store = _create(stateCreator);
		const initialState = store.getInitialState();
		const resetStore = () => {
			store.setState(initialState);
		};
		resetStoreFnSet.add(resetStore);
		return store;
	};
}) as typeof _create;

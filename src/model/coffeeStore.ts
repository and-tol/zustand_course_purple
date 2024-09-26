// import axios from 'axios';
import {create /*StateCreator*/} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {
	// CoffeeType,
	CoffeeQueryParams,
	CoffeeType,
} from '../types/coffee.type';
import {CartActions, CoffeeCartState, CoffeeListActions, ListState} from '../types/store.type';
import {cartSlice} from './cartSlice';
import {listSlice} from './listSlice';
// import {BASE_URL} from '../api/coreApi';

// type CoffeeState = {
// 	coffeeList?: CoffeeType[];
// 	controller?: AbortController;
// 	cart?: OrderItem[];
// 	address?: string;
// 	params: getCoffeeListReqParams;
// };

// type CoffeeActions = {
// 	getCoffeeList: (params?: getCoffeeListReqParams) => void;
// 	addToCart: (item: CoffeeType) => void;
// 	clearCart: () => void;
// 	orderCoffee: () => void;
// 	setAddress: (address: string) => void;
// 	setParams: (params?: getCoffeeListReqParams) => void;
// };

// const coffeeSlice: StateCreator<
// 	CoffeeActions & CoffeeState,
// 	[['zustand/devtools', never], ['zustand/persist', unknown]]
// > = (set, get) => ({
// 	cart: undefined,
// 	controller: undefined,
// 	coffeeList: undefined,
// 	address: undefined,
// 	params: {
// 		text: undefined,
// 	},
// 	setParams: (newParams) => {
// 		const { getCoffeeList, params } = get();
// 		set({ params: { ...params, ...newParams } }, false, 'setPArams');
// 		getCoffeeList(params);
// 	},
// 	clearCart: () => {
// 		set({ cart: undefined });
// 	},
// 	setAddress: (address) => {
// 		set({ address });
// 	},
// 	addToCart: (item) => {
// 		const { cart } = get();
// 		const { id, name, subTitle } = item;
// 		const preparedItem: OrderItem = {
// 			id,
// 			name: `${name} ${subTitle}`,
// 			size: 'L',
// 			quantity: 1,
// 		};
// 		set({ cart: cart ? [...cart, preparedItem] : [preparedItem] });
// 	},
// 	orderCoffee: async () => {
// 		const { cart, address, clearCart } = get();
// 		try {
// 			const { data } = await axios.post<OrderCoffeeRes>(URL + 'order', {
// 				address,
// 				orderItems: cart,
// 			});
// 			if (data.success) {
// 				alert(data.message);
// 				clearCart();
// 			}
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	},
// 	getCoffeeList: async (params) => {
// 		const { controller } = get();
// 		if (controller) {
// 			controller.abort();
// 		}
// 		const newController = new AbortController();
// 		set({ controller: newController });
// 		const { signal } = newController;
// 		try {
// 			const { data } = await axios.get(BASE_URL, { params, signal });
// 			set({ coffeeList: data });
// 		} catch (error) {
// 			if (axios.isCancel(error)) return;
// 			console.error(error);
// 		}
// 	},
// });

// export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(
// export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(
// 	devtools(
// 		persist(coffeeSlice, {
// 			name: 'coffeeStore',
// 			partialize: (state) => ({
// 				cart: state.cart,
// 				address: state.address,
// 			}),
// 		}),
// 		{
// 			name: 'coffeeStore',
// 		}
// 	)
// );

export const useCoffeeStore = create<CartActions & CoffeeCartState & CoffeeListActions & ListState>()(
	devtools(
		persist(
			immer((...arg) => ({ ...listSlice(...arg), ...cartSlice(...arg) })),
			{
				name: 'coffeeStore',
				partialize: (state) => ({
					cart: state.cart,
					address: state.address,
				}),
			}
		),
		{
			name: 'coffeeStore',
		}
	)
);

export const getCoffeeList = (params?: CoffeeQueryParams) =>
	useCoffeeStore.getState().getCoffeeList(params);

export const setParams = (params?: CoffeeQueryParams) =>
	useCoffeeStore.getState().setParams(params);

export const setAddress = (address: string) => useCoffeeStore.getState().setAddress(address);

export const orderCoffee = () => useCoffeeStore.getState().orderCoffee();

export const clearCart = () => useCoffeeStore.getState().clearCart();

export const addToCart = (item: CoffeeType) => useCoffeeStore.getState().addToCart(item);

export const setData = (data?: CoffeeType[]) => useCoffeeStore.setState({ coffeeList: data });

import { StateCreator } from 'zustand';
import { CartActions, CartState, ListActions, ListState } from '../types/store.type';
import axios from 'axios';
import { BASE_URL } from '../api/coreApi';
import { OrderCoffeeRes, OrderItem } from '../types/coffee.type';

export const cartSlice: StateCreator<
	CartActions & CartState & ListActions & ListState,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	CartActions & CartState
> = (set, get) => ({
	cart: undefined,
	address: undefined,
	addToCart: (item) => {
		const { cart } = get();
		const { id, name, subTitle } = item;
		const preparedItem: OrderItem = {
			id,
			name: `${name} ${subTitle}`,
			size: 'L',
			quantity: 1,
		};
		set({ cart: cart ? [...cart, preparedItem] : [preparedItem] });
	},
	orderCoffee: async () => {
		const { cart, address, clearCart } = get();
		try {
			const { data } = await axios.post<OrderCoffeeRes>(BASE_URL + 'order', {
				address,
				orderItems: cart,
			});
			if (data.success) {
				alert(data.message);
				clearCart();
			}
		} catch (error) {
			console.error(error);
		}
	},
	clearCart: () => {
		set({ cart: undefined });
	},
	setAddress: (address) => {
		set({ address });
	},
});

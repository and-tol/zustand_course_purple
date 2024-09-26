import axios from 'axios';
import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { BASE_URL } from '../api/coreApi';
import { CoffeeSizeEnum, CoffeItem, OrderCoffeeRes } from '../types/coffee.type';
import { CartActions, CoffeeCartState, CoffeeListActions, ListState } from '../types/store.type';

export const cartSlice: StateCreator<
	CartActions & CoffeeCartState & CoffeeListActions & ListState,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	CartActions & CoffeeCartState
> = (set, get) => ({
	cart: undefined,
	address: undefined,

	clearCart: () => {
		set({ cart: undefined });
	},

	setAddress: (address) => {
		set({ address });
	},

	addToCart(item) {
		// const {cart} = get();
		const { id, name, subTitle } = item;

		const preparedItem: CoffeItem = {
			id: item.id,
			name: `${item.name} ${subTitle}`,
			quantity: 1,
			size: CoffeeSizeEnum.L,
		};

		set(
			produce<CoffeeCartState>((draft) => {
				if (!draft.cart) draft.cart = [];
				
				const itemIndex = draft.cart.findIndex((item) => item.id === preparedItem.id);

				if (itemIndex !== -1) {
					draft.cart[itemIndex].quantity += 1;
					return;
				}
				
				draft.cart.push(preparedItem);
			})
		);
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
});

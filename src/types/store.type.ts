import { CoffeeType, getCoffeeListReqParams, OrderItem } from './coffee.type';

export type ListState = {
	coffeeList?: CoffeeType[];
	controller?: AbortController;
	params: getCoffeeListReqParams;
};

export type ListActions = {
	getCoffeeList: (params?: getCoffeeListReqParams) => void;
	setParams: (params?: getCoffeeListReqParams) => void;
};

export type CartState = {
	cart?: OrderItem[];
	address?: string;
};

export type CartActions = {
	setAddress: (address: string) => void;
	addToCart: (item: CoffeeType) => void;
	orderCoffee: () => void;
	clearCart: () => void;
};

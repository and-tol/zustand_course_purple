import {CoffeeQueryParams, CoffeeType, CoffeItem} from './coffee.type';

export type ListState = {
	coffeeList?: CoffeeType[];
	controller?: AbortController;
	params: CoffeeQueryParams;
};

export type CoffeeListActions = {
	getCoffeeList: (params?: CoffeeQueryParams) => Promise<CoffeeType[]>;
	setParams: (params?: CoffeeQueryParams) => void;
};

export type CoffeeCartState = {
	cart?: CoffeItem[];
	address?: string;
};

export type CartActions = {
	setAddress: (address: string) => void;
	addToCart: (item: CoffeeType) => void;
	orderCoffee: () => void;
	clearCart: () => void;
};

export enum CoffeeCategoryEnum {
	cappucino = 'cappucino',
	latte = 'latte',
	macchiato = 'macchiato',
	americano = 'americano',
}

export enum CoffeeSizeEnum { 
	M = 'M',
	L= 'L',
}

export type CoffeeType = {
	id: number;
	name: string;
	subTitle: string;
	type: string;
	price: number;
	image: string;
	rating: number;
};

export type CoffeeQueryParams = {
	text?: string;
	type?: CoffeeCategoryEnum;
};

export type CoffeItem = {
	id: number;
	name: string;
	quantity: number;
	size: CoffeeSizeEnum.L;
};

export type OrderCoffeeReq = {
	address: string;
	orderItems: CoffeItem[];
};

export type OrderCoffeeRes = {
	message: string;
	success: boolean;
};

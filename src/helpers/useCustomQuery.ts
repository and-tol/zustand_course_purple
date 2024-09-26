import { useQuery } from '@tanstack/react-query';
import { getCoffeeList, setData } from '../model/coffeeStore';
import { useEffect } from 'react';
import {CoffeeQueryParams} from '../types/coffee.type';

export const useCustomQuery = (params: CoffeeQueryParams) => {
	const { data, status } = useQuery({
		queryKey: ['coffeList', params],
		queryFn: () => getCoffeeList(),
	});

	useEffect(() => {
		setData(data);
	}, [data, status]);
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

const useMutateCoffeList = () => {
	const client = useQueryClient();
	const {mutate} = useMutation({
		mutationFn: () => Promise.resolve(''),
		onSuccess: () => client.invalidateQueries({ queryKey: ['coffeeList'] }),
	});
	return mutate;
};

// can add query to every buttons(functions) in the app for query to server

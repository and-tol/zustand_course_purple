import { Input } from 'antd';
import { getCoffeeList, setParams, useCoffeeStore } from '../model/coffeeStore';
import { useShallow } from 'zustand/react/shallow';
import {useEffect} from 'react';

function SearchInput() {
	const [params] = useCoffeeStore(useShallow((state) => [state.params]));

	useEffect(() => {
		getCoffeeList(params);
	}, []);

	return (
		<Input
			// value={value}
			value={params.text}
			placeholder="Search"
			// onChange={(e) => setText(e.target.value)} />
			onChange={(e) => setParams({ text: e.target.value })}
		/>
	);
}

export default SearchInput;

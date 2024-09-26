import { Input } from 'antd';
import { setParams, useCoffeeStore } from '../model/coffeeStore';
import { useShallow } from 'zustand/react/shallow';
import { useCustomQuery } from '../helpers/useCustomQuery';
import { useURLParamsStore } from '../helpers/useURLParamsStore';

function SearchInput() {
	const [params] = useCoffeeStore(useShallow((state) => [state.params]));
	useURLParamsStore(params, setParams);

	useCustomQuery(params);

	// useEffect(() => {
	// 	getCoffeeList(params);
	// }, []);

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

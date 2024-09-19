import { Button, Card, Input, Rate, Tag } from 'antd';

import { useCoffeeStore } from './model/coffeeStore';
import { useEffect } from 'react';
// import { useSearchStore } from './model/searchStore';
import './App.css';
import { useURLStorage } from './helpers/useURLStorage';
import CoffeeCard from './components/CoffeeCard';
import Cart from './components/Cart';

function App() {
	const { coffeeList, getCoffeeList, params, setParams } = useCoffeeStore();
	// const [text, setText] = useState<string | undefined>();
	//const { setText, text } = useSearchStore(); // TODO: ? can I use SIGNAL in this place?

	// const handleSearch = (text: string) => {
	// 	getCoffeeList({ text });
	// 	setText(text);
	// };

	useEffect(() => {
		getCoffeeList(params);
	}, []);

	useURLStorage(params, setParams);

	return (
		<div className="wrapper">
			<Input
				// value={value}
				value={params.text}
				placeholder="Search"
				// onChange={(e) => setText(e.target.value)} />
				onChange={(e) => setParams({ text: e.target.value })}
			/>
			<div style={{ display: 'flex' }}>
				<div className="cardsContainer">
					{coffeeList && coffeeList.map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} />)}
				</div>
				<Cart />
			</div>
		</div>
	);
}

export default App;

import { useCoffeeStore } from './model/coffeeStore';
import './App.css';
import { useURLStorage } from './helpers/useURLStorage';
import Cart from './components/Cart';
import SearchInput from './components/SearchInput';
import { CardList } from './components/CardList';
import { CategoryPicker } from './components/CategoryPicker';

function App() {
	const { params, setParams } = useCoffeeStore();
	// const [text, setText] = useState<string | undefined>();
	//const { setText, text } = useSearchStore(); // TODO: ? can I use SIGNAL in this place?

	// const handleSearch = (text: string) => {
	// 	getCoffeeList({ text });
	// 	setText(text);
	// };

	useURLStorage(params, setParams);

	return (
		<div className="wrapper">
			<SearchInput />
			<CategoryPicker />
			<div style={{ display: 'flex' }}>
				<CardList />
				<Cart />
			</div>
		</div>
	);
}

export default App;

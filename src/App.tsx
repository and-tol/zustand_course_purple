import './App.css';
import { CardList } from './components/CardList';
import Cart from './components/Cart';
import { CategoryPicker } from './components/CategoryPicker';
import SearchInput from './components/SearchInput';
import { useURLParamsStore } from './helpers/useURLParamsStore';
import { useCoffeeStore } from './model/coffeeStore';


function App() {
	const { params, setParams } = useCoffeeStore();
	// const [text, setText] = useState<string | undefined>();
	//const { setText, text } = useSearchStore(); // TODO: ? can I use SIGNAL in this place?

	// const handleSearch = (text: string) => {
	// 	getCoffeeList({ text });
	// 	setText(text);
	// };

	useURLParamsStore(params, setParams);

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

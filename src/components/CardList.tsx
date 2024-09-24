import { useShallow } from 'zustand/react/shallow';
import CoffeeCard from './CoffeeCard';
import { useCoffeeStore } from '../model/coffeeStore';

export const CardList = () => {
	const [coffeeList] = useCoffeeStore(useShallow((state) => [state.coffeeList]));
	return (
		<div className="cardsContainer">
			{coffeeList && coffeeList.map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} />)}
		</div>
	);
};

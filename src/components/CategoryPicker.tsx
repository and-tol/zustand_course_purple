import { Button } from 'antd';
import { setParams, useCoffeeStore } from '../model/coffeeStore';
import { CoffeeCategoryEnum } from '../types/coffee.type';
import { useShallow } from 'zustand/react/shallow';

export const CategoryPicker = () => {
	const [params] = useCoffeeStore(useShallow((state) => [state.params]));
	return (
		<div>
			<div>CategoryPicker</div>
			{Object.keys(CoffeeCategoryEnum).map((key) => (
				<Button
					key={key}
					danger={params === key}
					onClick={() =>
						setParams({ type: CoffeeCategoryEnum[key as keyof typeof CoffeeCategoryEnum] })
					}
				>
					{key}
				</Button>
			))}
		</div>
	);
};

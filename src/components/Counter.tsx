import { Button } from 'antd';
import { useCounterStore } from '../model/counterStore';

function Counter() {
	const { counter, decrement, increment, persistedCounter, resetStore } = useCounterStore();

	return (
		<div>
			<h1>counter</h1>
			<Button onClick={increment}>+</Button>
			<span>{counter}</span>
			<span>{persistedCounter}</span>
			<Button onClick={decrement}>-</Button>
			<Button onClick={resetStore}>reset</Button>
		</div>
	);
}

export default Counter;

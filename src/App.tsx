import { Button, Card, Input, Rate, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './App.css';
import { useCoffeeStore } from './model/coffeeStore';
import { useEffect, useState } from 'react';


function App() {
	const { coffeeList, getCoffeeList } = useCoffeeStore();
	const [text, setText] = useState<string | undefined>();
	const handleSearch = (text: string) => {
		getCoffeeList({ text });
		setText(text);
	};

	useEffect(() => {
		getCoffeeList();
	}, []);

	return (
		<div className="wrapper">
			
			<Counter />
			
			<Input
				value={text}
				placeholder="Search"
				onChange={(e) => handleSearch(e.target.value)}
			/>
			<div className="cardsContainer">
				{coffeeList &&
					coffeeList.map((coffee) => (
						<Card
							key={coffee.id}
							cover={<img src={coffee.image} alt={coffee.name} />}
							actions={[<Button icon={<ShoppingCartOutlined />}>{coffee.price}</Button>]}
						>
							<Card.Meta title={coffee.name} description={coffee.subTitle} />
							<Tag color="purple" style={{ marginBlock: 12 }}>
								{coffee.type}
							</Tag>
							<Rate defaultValue={coffee.rating} disabled allowHalf style={{ marginBlock: 12 }} />
						</Card>
					))}
			</div>
		</div>
	);
}

export default App;

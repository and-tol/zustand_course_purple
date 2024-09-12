import { Button, Card, Input, Rate, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './App.css';
import { useCoffeeStore } from './model/coffeeStore';
import { useEffect } from 'react';
import { OrderItem } from './types/coffeetypes';
import { useSearchStore } from './model/searchStore';

function App() {
	const {
		coffeeList,
		getCoffeeList,
		addToCart,
		cart,
		clearCart,
		setAddress,
		address,
		orderCoffee,
	} = useCoffeeStore();
	// const [text, setText] = useState<string | undefined>();
	const { setText, text } = useSearchStore(); // TODO: ? can use SIGNAL in this place?

	// const handleSearch = (text: string) => {
	// 	getCoffeeList({ text });
	// 	setText(text);
	// };


	
	useEffect(() => {
		getCoffeeList();
	}, []);

	return (
		<div className="wrapper">
			<Input value={text} placeholder="Search" onChange={(e) => setText(e.target.value)} />
			<div style={{ display: 'flex' }}>
				<div className="cardsContainer">
					{coffeeList &&
						coffeeList.map((coffee) => (
							<Card
								key={coffee.id}
								cover={<img src={coffee.image} alt={coffee.name} />}
								actions={[
									<Button icon={<ShoppingCartOutlined onClick={() => addToCart(coffee)} />}>
										{coffee.price}
									</Button>,
								]}
							>
								<Card.Meta title={coffee.name} description={coffee.subTitle} />
								<Tag color="purple" style={{ marginTop: 12 }}>
									{coffee.type}
								</Tag>
								<Rate defaultValue={coffee.rating} disabled />
							</Card>
						))}
				</div>
				<aside className="cart">
					<h1>Order</h1>
					{cart && cart.length > 0 ? (
						<>
							{cart.map((item, index) => (
								<span key={index}>{item.name}</span>
							))}
							<Input
								placeholder="address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
							<Button type="primary" onClick={orderCoffee} disabled={!address}>
								Make order
							</Button>
							<Button onClick={clearCart}>Clear cart</Button>
						</>
					) : (
						<span>Add drink!</span>
					)}
				</aside>
			</div>
		</div>
	);
}

export default App;

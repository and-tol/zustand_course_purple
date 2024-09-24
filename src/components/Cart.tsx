import { Button, Input } from 'antd';
import { clearCart, orderCoffee, setAddress, useCoffeeStore } from '../model/coffeeStore';
import { useShallow } from 'zustand/react/shallow';

function Cart() {
	const [cart, address] =
		useCoffeeStore(useShallow(state=>[state.cart, state.address]));
	return (
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
	);
}

export default Cart;

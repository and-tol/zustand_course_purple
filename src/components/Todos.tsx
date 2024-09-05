import { Button } from 'antd';
import { useTodosStore } from '../model/todoStore';

function Todos() {
	const { todos, addTodo, changeIsCompleted } = useTodosStore();

	return (
		<div>
			<h1>Todo</h1>
			<Button onClick={() => addTodo('some')}>+</Button>
			<ul>
				{todos &&
					todos.map((todo, index) => {
						return (
							<li key={index}>
								{todo.title}
								<input
									type="checkbox"
									onClick={() => changeIsCompleted(index)}
									checked={todo.isCompleted}
								/>
							</li>
						);
					})}
			</ul>
		</div>
	);
}

export default Todos;

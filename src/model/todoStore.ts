import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TodoType = {
	title: string;
	isCompleted: boolean;
};

type TodoState = {
	todos: TodoType[];
};

type TodoActions = {
	addTodo: (value: string) => void;
	changeIsCompleted: (index: number) => void;
};

const TodoSlice: StateCreator<TodoActions & TodoState, [['zustand/devtools', never]]> = (
	set,
	get
) => ({
	todos: [],
	addTodo: (value: string) => {
		const { todos } = get();
		set({ todos: [...todos, { title: value, isCompleted: false }] }, false, `add Todo: ${value}`);
	},
	changeIsCompleted: (index: number) => {
		const { todos } = get();
		const newTodos: TodoType[] = [
			...todos.slice(0, index),
			{ ...todos[index], isCompleted: !todos[index].isCompleted },
			...todos.slice(index + 1),
		];
		set({ todos: newTodos }, false, `changeIsCompleted: ${todos[index].title} to ${newTodos[index].isCompleted}`);
	},
});

export const useTodosStore = create<TodoState & TodoActions>()(devtools(TodoSlice));

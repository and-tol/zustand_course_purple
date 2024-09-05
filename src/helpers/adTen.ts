import { changeByAmound, getCounter } from '../model/counterStore';

export const addTen = () => {
	const counter = getCounter();
	
	if (counter<0) {
		changeByAmound(-10);
	} else {
		changeByAmound(10);
	}
};

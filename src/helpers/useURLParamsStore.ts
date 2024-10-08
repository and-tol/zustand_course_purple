import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

export const useURLParamsStore = <T extends Record<string, string>>(
	params: T,
	setParams: (params: T) => void
) => {
	const [queryParams, setQueryParams] = useSearchParams();
	const setParamsFromURL = () => {
		const paramsFromURL = Object.keys(params).reduce((acc, key) => {
			const value = queryParams.get(key);
			if (value) {
				acc[key as keyof T] = value as T[keyof T];
			}
			return acc;
		}, {} as Partial<T>);
		if (paramsFromURL) {
			setParams(paramsFromURL as T);
		}
	};
	useEffect(setParamsFromURL, [queryParams]);

	useEffect(() => {
		const newQueryParams = new URLSearchParams();
		// params.text && newQueryParams.set('text', params.text);
		Object.keys(params).forEach(key => {
			const value = params[key];
			if (value) {
				newQueryParams.set(key, value);
			}
		})
		setQueryParams(newQueryParams);
	}, [params]);
};

import { colors } from './colors';

export const getColor = (type) => {
	const found = colors.find((color) => color.name === type);
	return found;
};

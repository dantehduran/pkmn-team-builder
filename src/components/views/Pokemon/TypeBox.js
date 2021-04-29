import React from 'react';
import { getColor } from '../../../helpers/getColor';
import { capitalize } from '../../../helpers/capitalize';

export const TypeBox = ({ type, badge }) => {
	const { colors } = getColor(type);
	const styles = {
		backgroundColor: colors[0],
		background: `linear-gradient(${colors[0]} 90%, ${colors[1]} 90%)`,
		color: '#fff',
		textShadow: `0 1px 1px rgba(0, 0, 0, 0.5)`,
		border: `1px solid rgba(0, 0, 0, 0.2)`,
		overflow: 'hidden',
		position: 'relative',
		padding: '10px 15px',
		display: 'table-cell',
		marginBottom: '-1px',
		textAlign: 'center'
	};

	return (
		<div style={styles}>
			<span>{capitalize(type)}</span>
		</div>
	);
};

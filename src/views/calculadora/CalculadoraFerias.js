import React from 'react';
import { Container } from '@mui/material';
import NavBar from '../../components/NavBar';
import ReturnButton from '../../components/ReturnButton';

const CalculadoraFerias = () => {
	return (
		<Container sx={{ minWidth: '100%' }} disableGutters>
			<NavBar />
			<ReturnButton />
		</Container>
	);
};

export default CalculadoraFerias;

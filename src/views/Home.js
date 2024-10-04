import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	let navigate = useNavigate();
	const routeChange = (path) => {
		navigate(path);
	};

	return (
		<Container maxWidth="sm">
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Typography variant="h4" gutterBottom>
					Controle de finanças
				</Typography>
				<Button
					variant="contained"
					color="primary"
					style={{ margin: '10px' }}
					onClick={() => routeChange('calcSalario')}
				>
					Cálculo de salário líquido
				</Button>
				<Button
					variant="contained"
					color="secondary"
					style={{ margin: '10px' }}
				>
					Calculadora de férias
				</Button>
				<Button variant="contained" color="success" style={{ margin: '10px' }}>
					Planilha de finanças
				</Button>
			</Box>
		</Container>
	);
};

export default Home;

import React from 'react';
import { Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SvgIcon from '@mui/material/SvgIcon';
import CalculateIcon from '@mui/icons-material/Calculate';
import SavingsIcon from '@mui/icons-material/Savings';
import '../assets/css/home.css';

const Home = () => {
	let navigate = useNavigate();
	const routeChange = (path) => {
		navigate(path);
	};

	return (
		<Container sx={{ minWidth: '100%' }} disableGutters>
			<NavBar />
			<Container maxWidth="sm">
				<Box
					display="flex"
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					minHeight="100vh"
				>
					<Button
						variant="text"
						onClick={() => routeChange('calcSalario')}
						sx={{
							minWidth: 300,
							minHeight: 300,
							color: 'black',
							margin: 10,
						}}
						color="black"
						className="float-on-hover"
					>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<SvgIcon
								component={CalculateIcon}
								sx={{ width: 200, height: 200 }}
							/>
							Calculadora
						</Box>
					</Button>
					<Button
						variant="text"
						sx={{
							minWidth: 300,
							minHeight: 300,
							color: 'black',
							margin: 10,
						}}
						color="black"
						className="float-on-hover"
					>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<SvgIcon
								component={SavingsIcon}
								sx={{ width: 200, height: 200 }}
							/>
							Controle de finanças
						</Box>
					</Button>
				</Box>
			</Container>
		</Container>
	);
};

export default Home;

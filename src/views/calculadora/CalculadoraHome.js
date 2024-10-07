import React from 'react';
import { Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import SvgIcon from '@mui/material/SvgIcon';
import '../../assets/css/home.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ReturnButton from '../../components/ReturnButton';

const CalculadoraHome = () => {
	let navigate = useNavigate();
	const routeChange = (path) => {
		navigate(path);
	};

	return (
		<Container sx={{ minWidth: '100%' }} disableGutters>
			<NavBar />
			<ReturnButton />
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
						onClick={() => routeChange('salario')}
						sx={{
							minWidth: 300,
							minHeight: 300,
							color: 'black',
							margin: 10,
							marginTop: -17,
						}}
						color="black"
						className="float-on-hover"
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<SvgIcon
								component={PaymentsIcon}
								sx={{ width: 200, height: 200 }}
							/>
							Salário Líquido
						</Box>
					</Button>
					<Button
						variant="text"
						sx={{
							minWidth: 300,
							minHeight: 300,
							color: 'black',
							margin: 10,
							marginTop: -17,
						}}
						color="black"
						className="float-on-hover"
						onClick={() => routeChange('ferias')}
					>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<SvgIcon
								component={CalendarMonthIcon}
								sx={{ width: 200, height: 200 }}
							/>
							Férias
						</Box>
					</Button>
					<Button
						variant="text"
						sx={{
							minWidth: 300,
							minHeight: 300,
							color: 'black',
							margin: 10,
							marginTop: -17,
						}}
						color="black"
						className="float-on-hover"
						onClick={() => routeChange('recisao')}
					>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<SvgIcon
								component={HandshakeIcon}
								sx={{ width: 200, height: 200 }}
							/>
							Recisão
						</Box>
					</Button>
				</Box>
			</Container>
		</Container>
	);
};

export default CalculadoraHome;

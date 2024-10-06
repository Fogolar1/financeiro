import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	let navigate = useNavigate();
	const routeChange = (path) => {
		navigate(path);
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
				<Typography variant="h6" style={{ flexGrow: 0.1, width: 10 }}>
					Financeiro
				</Typography>

				<Box sx={{ flexGrow: 0.1, maxWidth: 150 }}>
					<Button
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						color="white"
					>
						Calculadora
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={() => routeChange('calcSalario')}>
							Salário Líquido
						</MenuItem>
						<MenuItem onClick={handleClose}>Férias</MenuItem>
						<MenuItem onClick={handleClose}>Recisão</MenuItem>
					</Menu>
				</Box>
				<Box sx={{ flexGrow: 0.1, maxWidth: 200 }}>
					<Button onClick={handleClick} color="white">
						Controle de finanças
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;

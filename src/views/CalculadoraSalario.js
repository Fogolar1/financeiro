import React from 'react';
import {
	Box,
	Container,
	Typography,
	FormControl,
	TextField,
	Button,
} from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CalculadoraSalario = () => {
	const currencyMask = (value) => {
		value = value.replace(/\D/g, '');
		value = value.replace(/^0+/, '');
		value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		value = 'R$ ' + value;
		return value;
	};

	const [salarioBruto, setSalarioBruto] = React.useState('R$ 0');

	const changeSalarioBrutoValor = (event) => {
		let inputValue = currencyMask(event.target.value);

		setSalarioBruto(inputValue);
	};

	const [outrosDescontos, setOutrosDescontos] = React.useState('R$ 0');

	const changeOutrosDescontosValor = (event) => {
		let inputValue = currencyMask(event.target.value);
		setOutrosDescontos(inputValue);
	};

	const calcularSalarioLiquido = () => {
		let salarioBrutoNumber = salarioBruto.replace('R$ ', '').replace('.', '');
		let outrosDescontosNumber = outrosDescontos
			.replace('R$ ', '')
			.replace('.', '');

		salarioBrutoNumber = parseFloat(salarioBrutoNumber);
		outrosDescontosNumber = parseFloat(outrosDescontosNumber);
		let inssAliquota = 0;

		if (salarioBrutoNumber <= 1412) inssAliquota = 0.075;
		else if (salarioBrutoNumber <= 2666.68) inssAliquota = 0.09;
		else if (salarioBrutoNumber <= 4000.03) inssAliquota = 0.12;
		else inssAliquota = 0.14;

		let irrfAliquota = 0;
		if (salarioBrutoNumber > 2259.2 && salarioBrutoNumber <= 2826.65)
			irrfAliquota = 0.075;
		else if (salarioBrutoNumber <= 3751.05) irrfAliquota = 0.15;
		else if (salarioBrutoNumber <= 4664.68) irrfAliquota = 0.225;
		else irrfAliquota = 0.275;

		let descontInss = salarioBrutoNumber * inssAliquota;
		let descontIrrf = salarioBrutoNumber * irrfAliquota - descontInss;
		let salarioLiquido =
			salarioBrutoNumber - descontInss - descontIrrf - outrosDescontosNumber;

		console.log(salarioLiquido);
	};

	const [horasExtras, setHorasExtras] = React.useState(
		dayjs('2024-01-01T15:30')
	);

	return (
		<Container>
			<Typography
				variant="h4"
				gutterBottom
				sx={{ justifyContent: 'center', display: 'flex' }}
			>
				Calculadora de salário líquido
			</Typography>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					height: '100vh',
					padding: '50px',
				}}
			>
				<Box
					sx={{
						width: 1000,
						height: 300,
						display: 'flex',
						justifyContent: 'center',
						border: '1px solid black',
					}}
				>
					<FormControl sx={{ width: '100%' }}>
						<Container
							sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
						>
							<TextField
								label="Salário Bruto"
								value={salarioBruto}
								onChange={changeSalarioBrutoValor}
								sx={{
									width: 250,
									marginTop: '20px',
									marginLeft: '50px',
									display: 'flex',
								}}
							/>
							<TextField
								label="Outros descontos"
								value={outrosDescontos}
								onChange={changeOutrosDescontosValor}
								sx={{
									width: 250,
									marginTop: '20px',
									marginLeft: '50px',
									display: 'flex',
								}}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<TimePicker
									label="Horas extras"
									sx={{
										width: 250,
										marginTop: '20px',
										marginLeft: '50px',
										display: 'flex',
									}}
									onChange={(newValue) => setHorasExtras(newValue)}
									views={['hours', 'minutes']}
									format="HH:mm"
									value={horasExtras}
								/>
							</LocalizationProvider>
						</Container>
						<Container sx={{ justifyContent: 'center', display: 'flex' }}>
							<Button
								variant="contained"
								color="primary"
								sx={{ width: 100, marginTop: 2 }}
								onClick={() => {
									calcularSalarioLiquido();
								}}
							>
								Calcular
							</Button>
						</Container>
					</FormControl>
				</Box>
			</Container>
		</Container>
	);
};

export default CalculadoraSalario;

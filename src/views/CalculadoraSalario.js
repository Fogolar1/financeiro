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
import { PieChart } from '@mui/x-charts/PieChart';

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

	const salarioBrutoNumber = () => {
		return parseFloat(salarioBruto.replace('R$ ', '').replace('.', ''));
	};

	//TODO - Calculo de horas extras
	const calcularSalarioLiquido = () => {
		let salarioBrutoNumber = salarioBruto.replace('R$ ', '').replace('.', '');
		let outrosDescontosNumber = outrosDescontos
			.replace('R$ ', '')
			.replace('.', '');

		salarioBrutoNumber = parseFloat(salarioBrutoNumber);
		outrosDescontosNumber = parseFloat(outrosDescontosNumber);

		let descontoInssAux = 0;
		if (salarioBrutoNumber <= 1412)
			descontoInssAux = salarioBrutoNumber * 0.075;
		else if (salarioBrutoNumber <= 2666.68) {
			descontoInssAux = 1412 * 0.075;
			descontoInssAux += (salarioBrutoNumber - 1412) * 0.09;
		} else if (salarioBrutoNumber <= 4000.03) {
			descontoInssAux = 1412 * 0.075;
			descontoInssAux += (2666.68 - 1412) * 0.09;
			descontoInssAux += (salarioBrutoNumber - 2666.68) * 0.12;
		} else if (salarioBrutoNumber <= 7786.02) {
			descontoInssAux = 1412 * 0.075;
			descontoInssAux += (2666.68 - 1412) * 0.09;
			descontoInssAux += (7786.02 - 2666.68) * 0.12;
			descontoInssAux += (salarioBrutoNumber - 7786.02) * 0.14;
		} else if (salarioBrutoNumber > 7786.02) descontoInssAux = 908.85;

		setDescontoInss(descontoInssAux);
		let baseIrrf = salarioBrutoNumber - descontoInssAux;
		console.log(baseIrrf);

		let descontoIrrfAux = 0;
		if (baseIrrf <= 2112) descontoIrrfAux = 0;
		else if (baseIrrf <= 2826.65) descontoIrrfAux = baseIrrf * 0.075 - 169.44;
		else if (baseIrrf <= 3751.05) descontoIrrfAux = baseIrrf * 0.15 - 381.44;
		else if (baseIrrf <= 4664.68) descontoIrrfAux = baseIrrf * 0.225 - 662.77;
		else descontoIrrfAux = baseIrrf * 0.275 - 896;

		setDescontoIrrf(descontoIrrfAux);

		setSalarioLiquido(
			salarioBrutoNumber -
				descontoInssAux -
				descontoIrrfAux -
				outrosDescontosNumber
		);
	};

	const [horasExtras, setHorasExtras] = React.useState(
		dayjs('2024-01-01T00:00')
	);

	const [salarioLiquido, setSalarioLiquido] = React.useState(0);
	const [descontoInss, setDescontoInss] = React.useState(0);
	const [descontoIrrf, setDescontoIrrf] = React.useState(0);

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
						flexDirection: 'column',
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

					{salarioLiquido > 0 && (
						<Container
							sx={{
								display: 'flex',
								height: 100,
								flexDirection: 'row',
								marginTop: 5,
								width: '100%',
							}}
						>
							<Container>
								<Typography variant="h6" sx={{ marginLeft: 20 }}>
									Salário líquido: R$ {salarioLiquido.toFixed(2)}
								</Typography>
								<Typography variant="subtitle1" sx={{ marginLeft: 20 }}>
									Desconto IRRF: R$ {descontoIrrf.toFixed(2)}
								</Typography>
								<Typography variant="subtitle1" sx={{ marginLeft: 20 }}>
									Desconto INSS: R$ {descontoInss.toFixed(2)}
								</Typography>
							</Container>
							<PieChart
								width={500}
								height={170}
								sx={{ marginBottom: 8, marginRight: 20 }}
								series={[
									{
										data: [
											{
												id: 0,
												value: salarioLiquido.toFixed(2),
												label: 'Salário Líquido',
												coplor: 'green',
											},
											{
												id: 1,
												value: (salarioBrutoNumber() - salarioLiquido).toFixed(
													2
												),
												label: 'Descontos',
												color: 'red',
											},
										],
									},
								]}
							></PieChart>
						</Container>
					)}
				</Box>
			</Container>
		</Container>
	);
};

export default CalculadoraSalario;

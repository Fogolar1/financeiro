import React from 'react';
import {
	Container,
	Box,
	Typography,
	FormControl,
	TextField,
	Button,
	Table,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import NavBar from '../../components/NavBar';
import ReturnButton from '../../components/ReturnButton';

const CalculadoraFerias = () => {
	const currencyMask = (value) => {
		value = value.replace(/\D/g, '');
		value = value.replace(/^0+/, '');
		value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		value = 'R$ ' + value;
		return value;
	};

	const [salarioBruto, setSalarioBruto] = React.useState('R$ 0');
	const [diasFerias, setDiasFerias] = React.useState(0);

	const changeSalarioBrutoValor = (event) => {
		let inputValue = currencyMask(event.target.value);

		setSalarioBruto(inputValue);
	};

	const [descontoInss, setDescontoInss] = React.useState(0);
	const [descontoIrrf, setDescontoIrrf] = React.useState(0);
	const [valorFerias, setValorFerias] = React.useState(0);
	const [valorSalario, setValorSalario] = React.useState(0);

	const calcularFerias = () => {
		let salarioBrutoNumber = salarioBruto.replace('R$ ', '').replace('.', '');
		salarioBrutoNumber = parseFloat(salarioBrutoNumber);

		let salarioDia = salarioBrutoNumber / 30;
		salarioBrutoNumber = salarioDia * parseInt(diasFerias);
		setValorSalario(salarioBrutoNumber);
		salarioBrutoNumber = salarioBrutoNumber + salarioBrutoNumber / 3;

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

		let descontoIrrfAux = 0;
		if (baseIrrf <= 2112) descontoIrrfAux = 0;
		else if (baseIrrf <= 2826.65) descontoIrrfAux = baseIrrf * 0.075 - 169.44;
		else if (baseIrrf <= 3751.05) descontoIrrfAux = baseIrrf * 0.15 - 381.44;
		else if (baseIrrf <= 4664.68) descontoIrrfAux = baseIrrf * 0.225 - 662.77;
		else descontoIrrfAux = baseIrrf * 0.275 - 896;

		setDescontoIrrf(descontoIrrfAux);
		setValorFerias(salarioBrutoNumber - descontoInssAux - descontoIrrfAux);
	};

	return (
		<Container sx={{ minWidth: '100%' }} disableGutters>
			<NavBar />
			<ReturnButton />
			<Typography
				variant="h4"
				gutterBottom
				sx={{ justifyContent: 'center', display: 'flex' }}
			>
				Calculadora de férias
			</Typography>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					height: '70vh',
					flexDirection: 'column',
					marginLeft: 50,
				}}
				disablegutters
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
								sx={{
									width: '45%',
									marginTop: '20px',
									marginLeft: '50px',
									display: 'flex',
								}}
								value={salarioBruto}
								onChange={changeSalarioBrutoValor}
							/>
							<TextField
								label="Dias de férias"
								sx={{
									width: '40%',
									marginTop: '20px',
									marginLeft: '50px',
									display: 'flex',
								}}
								type="number"
								value={diasFerias}
								onChange={(newValue) => setDiasFerias(newValue.target.value)}
							/>
						</Container>
						<Container sx={{ justifyContent: 'center', display: 'flex' }}>
							<Button
								variant="contained"
								color="primary"
								sx={{ width: 100, marginTop: 2 }}
								onClick={calcularFerias}
							>
								Calcular
							</Button>
						</Container>
					</FormControl>
				</Box>
				{valorFerias > 0 && (
					<Container
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
						disablegutters
					>
						<Table sx={{ maxWidth: 700 }}>
							<TableBody>
								<TableRow>
									<TableCell>Valor Bruto</TableCell>
									<TableCell>
										{'R$ ' +
											(valorFerias + descontoInss + descontoIrrf).toFixed(2)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Salário</TableCell>
									<TableCell>{'R$ ' + valorSalario.toFixed(2)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Férias 1/3</TableCell>
									<TableCell>
										{'R$ ' +
											(
												valorFerias +
												descontoInss +
												descontoIrrf -
												valorSalario
											).toFixed(2)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>INSS</TableCell>
									<TableCell>{'- R$ ' + descontoInss.toFixed(2)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>IRRF</TableCell>
									<TableCell>{'- R$ ' + descontoIrrf.toFixed(2)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Total Líquido</TableCell>
									<TableCell>{'R$ ' + valorFerias.toFixed(2)}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</Container>
				)}
			</Container>
		</Container>
	);
};

export default CalculadoraFerias;

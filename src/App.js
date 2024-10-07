import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import CalculadoraSalario from './views/calculadora/CalculadoraSalario';
import CalculadoraHome from './views/calculadora/CalculadoraHome';
import CalculadoraFerias from './views/calculadora/CalculadoraFerias';
import CalculadoraRecisao from './views/calculadora/CalculadoraRecisao';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/calculadora" element={<CalculadoraHome />} />
				<Route path="/calculadora/salario" element={<CalculadoraSalario />} />
				<Route path="/calculadora/ferias" element={<CalculadoraFerias />} />
				<Route path="/calculadora/recisao" element={<CalculadoraRecisao />} />
			</Routes>
		</Router>
	);
}

export default App;

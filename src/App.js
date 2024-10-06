import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import CalculadoraSalario from './views/CalculadoraSalario';
import CalculadoraHome from './views/CalculadoraHome';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/calculadora" element={<CalculadoraHome />} />
				<Route path="/calculadora/salario" element={<CalculadoraSalario />} />
			</Routes>
		</Router>
	);
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import CalculadoraSalario from './views/CalculadoraSalario';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/calcSalario" element={<CalculadoraSalario />} />
			</Routes>
		</Router>
	);
}

export default App;

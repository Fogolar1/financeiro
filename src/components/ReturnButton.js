import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ReturnButton = () => {
	let navigate = useNavigate();

	return (
		<IconButton onClick={() => navigate(-1)}>
			<ArrowBackIcon fontSize="large" />
		</IconButton>
	);
};

export default ReturnButton;

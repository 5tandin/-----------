import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Normalize } from 'styled-normalize';

createRoot(document.getElementById('root')).render(
	<>
		<App />
		<Normalize />
	</>,
);

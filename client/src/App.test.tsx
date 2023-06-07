import { render, screen } from '@testing-library/react';

import App from './App';

describe('App component', () => {
	test('renders Home link', () => {
		render(<App />);
		const linkElement = screen.getByText(/Home/i);
		expect(linkElement).toBeInTheDocument();
	});
});

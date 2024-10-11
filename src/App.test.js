import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
    // Existing tests
    it('renders without crashing', () => {
        render(<App />);
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders the BoxList component', () => {
        render(<App />);

        // Check for the presence of input fields and submit button, which are part of BoxList
        const backgroundColorInput = screen.getByPlaceholderText('Background Color');
        const widthInput = screen.getByPlaceholderText('Width');
        const heightInput = screen.getByPlaceholderText('Height');
        const submitButton = screen.getByRole('button', { name: 'Add Box' });

        expect(backgroundColorInput).toBeInTheDocument();
        expect(widthInput).toBeInTheDocument();
        expect(heightInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('contains inputs for adding new boxes', () => {
        render(<App />);
        const backgroundColorInput = screen.getByPlaceholderText('Background Color');
        const widthInput = screen.getByPlaceholderText('Width');
        const heightInput = screen.getByPlaceholderText('Height');

        expect(backgroundColorInput).toBeInTheDocument();
        expect(widthInput).toBeInTheDocument();
        expect(heightInput).toBeInTheDocument();
    });

    it('contains a submit button for adding new boxes', () => {
        render(<App />);
        const submitButton = screen.getByRole('button', { name: 'Add Box' });
        expect(submitButton).toBeInTheDocument();
    });

    it('initially renders no boxes', () => {
        render(<App />);
        const boxes = screen.queryAllByRole('button', { name: 'X' });
        expect(boxes).toHaveLength(0);
    });
});
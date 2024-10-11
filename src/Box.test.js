import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Box from './Box';

describe('BoxList Component', () => {
    const mockRemoval = jest.fn();

    it('renders without crashing', () => {
        render(
            <Box
                id="test-id"
                backgroundColor="red"
                width="100"
                height="100"
                removal={mockRemoval}
            />
        );
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Box
            id="test-id"
            backgroundColor="red"
            width="100"
            height="100"
            removal={mockRemoval}
        />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with correct styles', () => {
        const { container } = render(
            <Box
                id="test-id"
                backgroundColor="red"
                width="100"
                height="100"
                removal={mockRemoval}
            />
        );

        const boxDiv = container.firstChild;
        expect(boxDiv).toHaveStyle({
            backgroundColor: 'red',
            width: '100px',
            height: '100px',
            position: 'relative'
        });
    });

    it('has a remove button', () => {
        render(
            <Box
                id="test-id"
                backgroundColor="blue"
                width="50"
                height="50"
                removal={mockRemoval}
            />
        );

        const removeButton = screen.getByRole('button');
        expect(removeButton).toBeInTheDocument();
        expect(removeButton).toHaveTextContent('X');
    });

    it('calls removal function when remove button is clicked', () => {
        render(
            <Box
                id="test-id"
                backgroundColor="green"
                width="75"
                height="75"
                removal={mockRemoval}
            />
        );

        const removeButton = screen.getByRole('button');
        fireEvent.click(removeButton);
        expect(mockRemoval).toHaveBeenCalledWith('test-id');
    });
});
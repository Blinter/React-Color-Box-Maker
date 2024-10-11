import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';
import '@testing-library/jest-dom';

describe('NewBoxForm', () => {
  // Smoke tests
  it('renders without crashing', () => {
    const { getByText } = render(<NewBoxForm />);
    expect(getByText('Add Box')).toBeInTheDocument();
  });

  // Snapshot tests
  it('matches snapshot', () => {
    const tree = render(<NewBoxForm />);
    expect(tree).toMatchSnapshot();
  });

  it('submits form data', async () => {
    const mockAddBox = jest.fn();
    render(<NewBoxForm addBox={mockAddBox} />);

    // Get input fields by their placeholder text
    const backgroundColorInput = screen.getByPlaceholderText('Background Color');
    const widthInput = screen.getByPlaceholderText('Width');
    const heightInput = screen.getByPlaceholderText('Height');

    // Fill out the form
    fireEvent.change(backgroundColorInput, { target: { value: 'red' } });
    fireEvent.change(widthInput, { target: { value: '100' } });
    fireEvent.change(heightInput, { target: { value: '200' } });

    // Submit the form
    const submitButton = screen.getByText('Add Box');
    fireEvent.click(submitButton);

    // Log form values after submission
    console.log('Form values after submission:', {
      backgroundColor: backgroundColorInput.value,
      width: widthInput.value,
      height: heightInput.value
    });

    // Wait for any asynchronous operations
    await waitFor(() => {
      // Check if mockAddBox was called
      expect(mockAddBox).toHaveBeenCalled();
    });

    console.log('mockAddBox call count:', mockAddBox.mock.calls.length);
    console.log('mockAddBox calls:', mockAddBox.mock.calls);

    // If mockAddBox was called, check its arguments
    if (mockAddBox.mock.calls.length > 0) {
      const lastCall = mockAddBox.mock.calls[mockAddBox.mock.calls.length - 1];
      const addBoxArg = lastCall[0];

      // Call the function passed to mockAddBox to get the actual value
      const result = typeof addBoxArg === 'function' ? addBoxArg([]) : addBoxArg;

      console.log('Result of addBoxArg:', result);

      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: 'red',
          width: '100',
          height: '200',
          key: expect.any(String)
        })
      ]));
    }
  });
});

async function fillInputs(input, value) {
  await input.setValue(value);
}
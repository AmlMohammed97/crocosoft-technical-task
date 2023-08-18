import { render, screen, act } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
    test(`renders label`, () => {
        render(<Input label='test input label' />);
        const label = screen.getByText('test input label');
        expect(label).toBeInTheDocument();
    });
    test(`renders placeholder`, () => {
        render(<Input placeholder='test input placeholder' />);
        const input = screen.getByPlaceholderText('test input placeholder');
        expect(input).toBeInTheDocument();
    });
    test(`renders required error`, () => {
        render(<Input placeholder='test required error' isRequired />);
        const input = screen.getByPlaceholderText('test required error');
        act(() => {
            /* fire events that update state */
            input.focus();
            input.blur();
        });
        const error = screen.getByText('This field is required');
        expect(error).toBeInTheDocument();
    });
    test(`renders invalid error`, () => {
        render(<Input placeholder='test invalid error' isInputValid={() => false} />);
        const input = screen.getByPlaceholderText('test invalid error');
        act(() => {
            /* fire events that update state */
            input.focus();
            input.blur();
        });
        const error = screen.getByText('Invalid value');
        expect(error).toBeInTheDocument();
    });
});
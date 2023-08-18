import { render, screen, act } from '@testing-library/react';
import TextArea from './TextArea';

describe('TextArea', () => {
    test(`renders label`, () => {
        render(<TextArea label='test textArea label' />);
        const label = screen.getByText('test textArea label');
        expect(label).toBeInTheDocument();
    });
    test(`renders placeholder`, () => {
        render(<TextArea placeholder='test textArea placeholder' />);
        const textArea = screen.getByPlaceholderText('test textArea placeholder');
        expect(textArea).toBeInTheDocument();
    });
    test(`renders required error`, () => {
        render(<TextArea placeholder='test required error' isRequired />);
        const textArea = screen.getByPlaceholderText('test required error');
        act(() => {
            /* fire events that update state */
            textArea.focus();
            textArea.blur();
        });
        const error = screen.getByText('This field is required');
        expect(error).toBeInTheDocument();
    });
});
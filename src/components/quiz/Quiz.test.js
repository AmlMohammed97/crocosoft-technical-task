import { render, screen } from '@testing-library/react';
import Quiz from './Quiz';
import { BrowserRouter } from 'react-router-dom';
const renderQuiz = (isAddingNewQuiz) => render(
    <BrowserRouter>
        <Quiz isAddingNewQuiz={isAddingNewQuiz} />
    </BrowserRouter>
);
describe('Quiz', () => {
    test(`renders add new quiz header`, () => {
        renderQuiz(true);
        const header = screen.getByText('Add new quiz');
        expect(header).toBeInTheDocument();
    });
    test(`renders edit quiz header`, () => {
        renderQuiz();
        const header = screen.getByText('Edit quiz');
        expect(header).toBeInTheDocument();
    });
    test(`renders disabled submit button`, () => {
        renderQuiz(true);
        const button = screen.getByText('Submit');
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });
    // test(`renders enabled submit button`, () => {
    //     renderQuiz();
    //     const button = screen.getByText('Submit');
    //     expect(button).toBeInTheDocument();
    // });
    test(`renders cancel button`, () => {
        renderQuiz();
        const button = screen.getByText('Cancel');
        expect(button).toBeInTheDocument();
    });
});
import { render, screen } from '@testing-library/react';
import QuizzesHome from './QuizzesHome';
import { BrowserRouter } from 'react-router-dom';

describe('QuizzesHome', () => {
  test(`renders add new quiz button`, () => {
    render(
      <BrowserRouter>
        <QuizzesHome />
      </BrowserRouter>
    );
    const button = screen.getByText('Add new quiz');
    expect(button).toBeInTheDocument();
  });
});
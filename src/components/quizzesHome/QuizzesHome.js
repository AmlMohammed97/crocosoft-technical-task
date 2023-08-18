import React from 'react';
import QuizPreview from './QuizPreview';
import { useNavigate } from 'react-router-dom';

export default function QuizzesHome({ quizzes }) {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px', alignItems: 'center' }}>
            <div style={{ width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                {
                    quizzes.map((quiz) => <QuizPreview key={quiz.id} quiz={quiz} />)
                }
            </div>
            <button onClick={() => navigate('/quiz')}>
                Add new quiz
            </button>
        </div>
    )
};
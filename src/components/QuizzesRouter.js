import React, { useState } from 'react';
import QuizzesHomePage from './quizzesHome/QuizzesHome';
import Quiz from './quiz/Quiz';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<QuizzesHomePage quizzes={quizzes} />} />
                <Route path="/quiz" element={<Quiz quizzes={quizzes} setQuizzes={setQuizzes} isAddingNewQuiz />} />
                <Route path="/quiz/:quizId" element={<Quiz quizzes={quizzes} setQuizzes={setQuizzes} />} />
            </Routes>
        </BrowserRouter>
    )
};
import React, { useState, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import Input from '../shared/input/Input';
import TextArea from '../shared/textArea/TextArea';
import Question from '../shared/question/Question';
import { isYotubeVideoUrlValid, constructQuizz } from '../../utils/quizUtils';

export default function Quiz({ quizzes, setQuizzes, isAddingNewQuiz }) {
    const navigate = useNavigate();
    const [quizId, setQuizId] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [quizYotubeUrl, setQuizYotubeUrl] = useState('');
    const [quizCreationDate, setQuizCreationDate] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [quizQuestions, setQuizQuestions] = useState({});
    const [numberOfQuestions, setNumberOfQuestions] = useState(1);
    const [questions, setQuestions] = useState([]);

    const onChangeQuestion = (questionIndex, question, answerValues, correctAnswerIndex, trueFeedback, wrongFeedback) => {
        setQuizQuestions((oldState) => ({
            ...oldState,
            [questionIndex]: {
                question,
                answers: answerValues,
                correctAnswerIndex,
                trueFeedback,
                wrongFeedback
            }
        }))
    };

    useEffect(() => {
        const questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            questions.push(<Question value={quizQuestions[i]} key={i} onChangeQuestion={(question, answerValues, correctAnswerIndex, trueFeedback, wrongFeedback) => onChangeQuestion(i, question, answerValues, correctAnswerIndex, trueFeedback, wrongFeedback)} />);
        }
        setQuestions(questions);
    }, [quizQuestions, numberOfQuestions])
    

    const matchQuiz = useMatch('/quiz/:id');
     const getAnswersObject = (answers) => {
        const answersObject = {};
        answers.map((answer, index) => {
            answersObject[index] = answer.text
            return null;
        });
        return answersObject;
    }
    const getQuestionsObject = (questions_answers) => {
        const questions = {};
        questions_answers.map((question, index) => {
            questions[index] = {
                question: question.text,
                answers: getAnswersObject(question.answers),
                correctAnswerIndex: question.answers.findIndex((answer) => answer.is_true),
                trueFeedback: question.feedback_true,
                wrongFeedback: question.feedback_false
            }
            return null;
        });
        return questions;
    }
    useEffect(() => {
        if (matchQuiz && matchQuiz.params.id) {
            const quiz = quizzes.find((quiz) => quiz.id === matchQuiz.params.id);
            if (quiz) {
                setQuizId(quiz.id);
                setQuizTitle(quiz.title);
                setQuizYotubeUrl(quiz.url);
                setQuizCreationDate(quiz.created);
                setQuizDescription(quiz.description);
                setNumberOfQuestions(quiz.questions_answers.length);
                setQuizQuestions(getQuestionsObject(quiz.questions_answers))
            }
        }
    }, [matchQuiz])
    
    const handleSaveQuiz = () => {
        setQuizzes((oldState) => [...oldState.filter((quiz) => quiz.id !== quizId), constructQuizz(quizTitle, quizYotubeUrl, quizDescription, quizQuestions, quizCreationDate)])
        navigate('/');
    };

    const isSubmitButtonDisabled = !quizTitle || !quizYotubeUrl || !quizDescription || !Object.keys(quizQuestions).length;
    return (
        <div style={{ width: '70%', margin: 'auto' }}>
            <h1>{isAddingNewQuiz ? "Add new quiz" : "Edit quiz"}</h1>
            <form>
                <Input label="Title" value={quizTitle} onInputChange={setQuizTitle} isRequired placeholder='Enter quiz title'/>
                <Input label="Youtube Url" value={quizYotubeUrl} onInputChange={setQuizYotubeUrl} isRequired isInputValid={isYotubeVideoUrlValid} placeholder='Enter youtube url'/>
                <TextArea label="Description" value={quizDescription} onInputChange={setQuizDescription} isRequired placeholder='Enter quiz description'/>
                {questions}
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button onClick={() => setNumberOfQuestions((oldState) => oldState += 1)} disabled={Object.keys(quizQuestions).length < numberOfQuestions}>Add a question</button>
                    <button onClick={handleSaveQuiz} disabled={isSubmitButtonDisabled} type="submit">Submit</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

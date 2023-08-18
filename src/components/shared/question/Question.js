import React, { useState, useEffect } from 'react'
import Input from '../input/Input';

export default function Question({ onChangeQuestion, value }) {
    const [numberOfAnswers, setNumberOfAnswers] = useState(2);
    const [question, setQuestion] = useState('');
    const [trueFeedback, setTrueFeedback] = useState('');
    const [wrongFeedback, setWrongFeedback] = useState('');
    const [answerValues, setAnswerValues] = useState({});
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        if (question && Object.keys(answerValues).length === numberOfAnswers && correctAnswerIndex && trueFeedback && wrongFeedback) {
            onChangeQuestion(question, answerValues, correctAnswerIndex, trueFeedback, wrongFeedback)
        }
    }, [question, answerValues, numberOfAnswers, correctAnswerIndex, trueFeedback, wrongFeedback])

    useEffect(() => {
        if (value) {
            console.log('VVV', value)
            setNumberOfAnswers(Object.keys(value.answerValues || {}).lengthvalue || 2);
            setQuestion(value.question);
            setTrueFeedback(value.trueFeedback);
            setWrongFeedback(value.wrongFeedback);
            setAnswerValues(value.answers || {});
            setCorrectAnswerIndex(value.correctAnswerIndex|| 0);
        }
    }, [value])
    
    
    const setAnswer = (value, key) => {
        if (value) {
            setAnswerValues((oldState) => ({
                ...oldState,
                [key]: value
            }));
        } else if (answerValues[key]) {
            setAnswerValues((oldState) => {
                delete oldState[key];
                return { ...oldState };
            });
        }
    };

    useEffect(() => {
        console.log('PPP', answerValues, numberOfAnswers)
        const answers = [];
            for (let i = 0; i < numberOfAnswers; i++) {
        answers.push(
            <label htmlFor="dark" className="radio-label" key={i}>
                <input
                    className="radio-input"
                    type="radio"
                    name="dark"
                    id="dark"
                    value="dark"
                    onChange={(event) => event.target.value && setCorrectAnswerIndex(i)}
                    checked={i === correctAnswerIndex}
                    disabled={!answerValues[i]}
                />
                <Input
                    label={`answer${i}`}
                    onInputChange={(value) => setAnswer(value, i)}
                    isRequired
                    inputStyle={{ margin: 0 }}
                    labelStyle={{ margin: 0 }}
                    placeholder='Enter answer option'
                    value={answerValues[i]}
                />
            </label>
        );
    }
      setAnswers(answers)
    }, [answerValues, numberOfAnswers])
    

    return (
        <div style={{ width: '100%', marginBottom: '50px' }}>
            <Input label="Question" value={question} onInputChange={setQuestion} inputStyle={{ margin: 0 }} isRequired placeholder='Enter question' />
            <Input
                label="Feed back for true answer"
                value={trueFeedback}
                onInputChange={setTrueFeedback}
                inputStyle={{ margin: 0 }}
                isRequired
                placeholder='Enter feed back'
            />
            <Input
                label="Feed back for wrong answer"
                value={wrongFeedback} 
                onInputChange={setWrongFeedback}
                inputStyle={{ margin: 0 }}
                isRequired
                placeholder='Enter feed back'
            />
            {answers}
            <button onClick={() => setNumberOfAnswers((oldState) => oldState += 1)} disabled={Object.keys(answerValues).length < numberOfAnswers}>Add an answer</button>
        </div>
  )
}

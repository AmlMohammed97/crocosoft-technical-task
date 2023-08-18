import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function QuizPreview({ quiz }) {
  const navigate = useNavigate();
  return (
    <div style={{
      border: 'solid 1px #393939',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      alignItems: 'center',
      borderRadius: '10px',
      width: '100%',
      marginBottom: '10px'
    }}>
      <h4>{quiz.title}</h4>
      <button onClick={() => navigate(`/quiz/${quiz.id}`)}>Edit</button>
    </div>
  )
}

// src/components/Onboarding/AssessmentForm.js
import React from 'react';

export const AssessmentForm = ({ question, currentAnswer, onAnswer }) => {
  if (!question) return <p>Loading question...</p>;

  return (
    <div className="assessment-form">
      <h3>{question.text}</h3>
      <div className="options">
        {question.options?.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={`answer-${question.id}`}
              value={option.value}
              checked={currentAnswer === option.value}
              onChange={() => onAnswer(question.id, option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

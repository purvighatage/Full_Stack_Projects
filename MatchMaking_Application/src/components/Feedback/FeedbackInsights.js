// src/components/Feedback/FeedbackInsights.js
export const FeedbackInsights = ({ feedback }) => {
  return (
    <div className="feedback-insights">
      <h3>Why it didn't work out</h3>
      <div className="insight">
        <h4>Communication Style</h4>
        <p>{feedback.communication}</p>
      </div>
      <div className="insight">
        <h4>Values Alignment</h4>
        <p>{feedback.values}</p>
      </div>
      <div className="insight">
        <h4>Suggested Improvements</h4>
        <p>{feedback.suggestions}</p>
      </div>
    </div>
  );
};
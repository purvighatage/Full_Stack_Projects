// src/components/Onboarding/ProgressBar.js
export const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}></div>
      <span>{current}/{total}</span>
    </div>
  );
};
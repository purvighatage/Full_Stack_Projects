// src/components/Common/Button.js
export const Button = ({ children, variant = 'primary', onClick }) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
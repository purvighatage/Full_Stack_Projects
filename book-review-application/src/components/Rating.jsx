import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Rating = ({ value, onChange }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => onChange(star)}>
          {value >= star ? <StarIcon /> : <StarBorderIcon />}
        </span>
      ))}
    </div>
  );
};
export default Rating;  
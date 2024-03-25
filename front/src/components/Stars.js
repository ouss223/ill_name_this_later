import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function BasicRating({rating}) {

  return (
    <div >
      <Rating
        name="read-only"
        value={rating}
        precision={0.1}
        emptyIcon={<StarIcon style={{ color: 'gray' }} />}
        readOnly
      />
    </div>
  );
}

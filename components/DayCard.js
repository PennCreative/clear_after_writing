import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs';
import { getJournalByDate } from '../utils/data/api/journalData';

export default function DayCard({
  fullDate, onClick, date, format,
}) {
  const isToday = format === fullDate;
  const [rating, setRating] = useState();
  const getRating = () => {
    getJournalByDate(fullDate).then(setRating);
  };

  useEffect(() => {
    getRating();
  }, []);

  let ratingClass;
  if (rating?.overall_rating >= 8) {
    ratingClass = 'high-rating';
  } else if (rating?.overall_rating >= 5) {
    ratingClass = 'medium-rating';
  } else {
    ratingClass = 'low-rating';
  }

  return (
    <div className={ratingClass}>
      <Button
        variant="link"
        onClick={() => onClick(date)}
        href={`/calendar/${fullDate}`}
      >
        <BsFillArrowUpRightSquareFill />
      </Button>
      <h1>{isToday ? 'Today' : date}</h1>
    </div>
  );
}

DayCard.propTypes = {
  fullDate: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
  format: PropTypes.string.isRequired,
};

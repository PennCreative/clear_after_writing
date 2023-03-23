import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getJournalByDate } from '../utils/data/api/journalData';
import { getJournalsSurvey } from '../utils/data/api/surveyData';

export default function DayCard({
  fullDate, onClick, date, format,
}) {
  const isToday = format === fullDate;
  const [rating, setRating] = useState();
  const [ratingClass, setRatingClass] = useState();
  const [significant, setSignificant] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRating = () => {
    getJournalByDate(fullDate).then((data) => {
      if (typeof data[0]?.id === 'number') {
        if (data[0].significant === true) {
          setSignificant('significant');
        }
        getJournalsSurvey(data[0]?.id).then((obj) => {
          let sum = 0;
          let count = 0;
          obj.forEach((ent) => {
            sum += ent.answer;
            count += 1;
          });
          const average = count > 0 ? sum / count : 0;
          const thisRating = Math.floor(average);
          setRating(thisRating);
          if (rating >= 8) {
            setRatingClass('high-rating');
          } else if (rating >= 5) {
            setRatingClass('medium-rating');
          } else {
            setRatingClass('low-rating');
          }
        });
      }
    });
  };

  useEffect(() => {
    getRating();
  }, [getRating]);

  return (
    <div className={`rating ${significant} ${ratingClass}`}>
      <Button
        variant="link"
        onClick={() => onClick(date)}
        href={`/calendar/${fullDate}`}
      >
        <h1>{isToday ? 'Today' : date}</h1>
      </Button>
    </div>
  );
}

DayCard.propTypes = {
  fullDate: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
  format: PropTypes.string.isRequired,
};

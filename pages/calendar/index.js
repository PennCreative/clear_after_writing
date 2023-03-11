import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import DayCard from '../../components/DayCard';

export default function CalendarYear() {
  const router = useRouter();
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const format = `2023-${currentMonth + 1}-${currentDate}`;

  const months = [
    { number: 1, name: 'January', days: 31 },
    { number: 2, name: 'February', days: 28 },
    { number: 3, name: 'March', days: 31 },
    { number: 4, name: 'April', days: 30 },
    { number: 5, name: 'May', days: 31 },
    { number: 6, name: 'June', days: 30 },
    { number: 7, name: 'July', days: 31 },
    { number: 8, name: 'August', days: 31 },
    { number: 9, name: 'September', days: 30 },
    { number: 10, name: 'October', days: 31 },
    { number: 11, name: 'November', days: 30 },
    { number: 12, name: 'December', days: 31 },
  ];

  const routeToDay = (monthName, day) => {
    console.log(`Clicked day ${day} in ${monthName}`);
    router.push(`/calendar/${format}`);
  };

  return (
    <Container className="year">
      {months.map((month) => (
        <div className="month" key={month.name}>
          <h2>{month.name}</h2>
          <Row className="days">
            {[...Array(month.days)].map((day, date) => (
              <Col key={date.id} className={`day-${date + 1} day p-2`}>
                <DayCard
                  date={date + 1}
                  format={format}
                  fullDate={`2023-${month.number}-${date + 1}`}
                  onClick={routeToDay}
                  monthName={month.name}
                />

              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

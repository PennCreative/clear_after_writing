import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';

function CalendarYear() {
  const router = useRouter();
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const formatDate = `2023-${currentMonth + 1}-${currentDate}`;
  console.log(formatDate);

  // An array of months to loop through
  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];

  const routeToDay = (monthName, day) => {
    console.log(`Clicked day ${day} in ${monthName}`);
    router.push(`/${monthName.toLowerCase()}/${day}`);
  };

  return (
    <Container className="year">
      {months.map((month) => (
        <div className="month" key={month.name}>
          <h2>{month.name}</h2>
          <Row className="days">
            {[...Array(month.days)].map((day, date) => (
              <Col key={date.id} className={`day-${date + 1} day p-2`}>
                <Button
                  onClick={() => routeToDay(month.name, date + 1)}
                  href={`/${month.name.toLowerCase()}/${date + 1}`}
                >
                  {date + 1}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default CalendarYear;

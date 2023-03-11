import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function ProfilePagination() {
  return (
    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Today">
        <h1>Today</h1>
      </Tab>
      <Tab eventKey="month" title="Month">
        <h1>Month</h1>
      </Tab>
      <Tab eventKey="year" title="Year">
        <h1>Year</h1>
      </Tab>
    </Tabs>
  );
}

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PropTypes from 'prop-types';

export default function ProfilePagination({ sleep, day, prod }) {
  return (
    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3 page"
    >
      <Tab eventKey="home" title="Sleep">
        <h5>Your average Sleep score is:</h5>
        <h1>{sleep * 10}%</h1>
      </Tab>
      <Tab eventKey="productivity" title="Productivity">
        <h5>Your average Productivity score is:</h5>
        <h1>{prod * 10}%</h1>
      </Tab>
      <Tab eventKey="overall" title="Overall">
        <h5>Your Day&#39;s average score is:</h5>
        <h1>{day * 10}%</h1>
      </Tab>
    </Tabs>
  );
}

ProfilePagination.propTypes = {
  sleep: PropTypes.number,
  day: PropTypes.number,
  prod: PropTypes.number,
}.isRequired;

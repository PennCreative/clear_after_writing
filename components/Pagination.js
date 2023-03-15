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
      <Tab eventKey="home" title="Sleep">
        <h1>Sleep</h1>
      </Tab>
      <Tab eventKey="productivity" title="Month">
        <h1>Productivity</h1>
      </Tab>
      <Tab eventKey="oveall" title="Overall">
        <h1>Overall</h1>
      </Tab>
    </Tabs>
  );
}

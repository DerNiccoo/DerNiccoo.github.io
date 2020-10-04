import React from "react";
import "./Expenditure.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SpendingsTable from "./Spendings.js";

class Expenditure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>Ausgaben</h2>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>Und hier könnte ihre Werbung stehen. jk.</Col>
          <Col>Hier kommt ein Diagramm hin</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <SpendingsTable />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Expenditure;

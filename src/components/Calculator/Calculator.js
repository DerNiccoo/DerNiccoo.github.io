import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Interest from "../Interest/Interest.js"

import ETFCalculator from "../ETFCalculator/ETFCalculator.js"

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "Zinseszins",
    };
  }

  render() {
    let page = "";
    if (this.state.show === "Zinseszins") {
      page = <Interest />
    } else if (this.state.show === "ETF Rechner") {
      page = <ETFCalculator />;
    }


    return (
      <div>
        <Row>
          <Col>
            <h2>Rechner</h2>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={true} />
          <Col lg={true} />
          <Col lg={true}>
            <FormControl
              as="select"
              name="calculator"
              onChange={(event) => { this.setState({ show: event.target.value }) }}
            >
              <option>Zinseszins</option>
              <option>ETF Rechner</option>
            </FormControl>
          </Col>
          <Col lg={true} />
          <Col lg={true} />
        </Row>
        <hr />
        {page}
      </div>

    );
  }

}

export default Calculator;
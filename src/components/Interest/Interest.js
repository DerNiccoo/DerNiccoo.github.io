import React from "react";
import "./Interest.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import CompoundInterest from "./CompoundInterest.js";

class Interest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 1000.0,
      rate: 1000.0,
      interval: 12.0,
      dynamic: 8.0,
      years: 20,
      tax: 26.375,
      taxFree: 801.0,
    };

    this.onChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    if (value === "" || value === undefined) {
      value = 0.0;
    }

    if (name === "interval") {
      if (value === "monatlich") {
        value = 12.0;
      } else if (value === "vierteljährlich") {
        value = 4.0;
      } else if (value === "halbjährlich") {
        value = 2.0;
      } else if (value === "jährlich") {
        value = 1.0;
      }
    }

    this.setState({
      [name]: parseFloat(value),
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>Zinseszins</h2>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={true}></Col>
          <Col lg={true}>
            <div className="interest-panel">
              <Table>
                <tbody>
                  <tr className="interest-row">
                    <td className="interest-data">Anfangskapital</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="1000,00"
                          name="start"
                          className="input-text"
                          aria-describedby="unit"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">€</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Sparrate</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="1000,00"
                          name="rate"
                          aria-describedby="unit"
                          className="input-text"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">€</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Sparintervall</td>
                    <td className="interest-data">
                      <FormControl
                        as="select"
                        name="interval"
                        onChange={this.onChange}
                      >
                        <option>monatlich</option>
                        <option>vierteljährlich</option>
                        <option>halbjährlich</option>
                        <option>jährlich</option>
                      </FormControl>
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Dynamik</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="8,000"
                          name="dynamic"
                          className="input-text"
                          aria-describedby="unit"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Maximale Laufzeit</td>
                    <td className="interest-data">
                      <FormControl
                        defaultValue="20"
                        name="years"
                        className="input-text"
                        onChange={this.onChange}
                      />
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Steuersatz</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="26,375"
                          name="tax"
                          className="input-text"
                          aria-describedby="unit"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">
                      jährlicher Steuerfreibetrag
                    </td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="801,00"
                          name="taxFree"
                          className="input-text"
                          aria-describedby="unit"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">€</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col lg={true}></Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <div className="interest-table-wrapper">
              <Table striped bordered hover className="interest-table">
                <thead>
                  <tr>
                    <th>Jahr</th>
                    <th>
                      Eingezahltes
                      <br />
                      Kapital
                    </th>
                    <th>
                      Passives
                      <br />
                      Einkommen
                    </th>
                    <th>
                      Gesamtes
                      <br />
                      Kapital
                    </th>
                    <th>Zinsen</th>
                    <th>Davon Steuern</th>
                    <th>
                      Erhaltene
                      <br />
                      Zinsen
                    </th>
                    <th>
                      Gesamtes Kapital
                      <br /> (Tief -2%)
                    </th>
                    <th>
                      Erhaltene Zinsen
                      <br /> (Tief -2%)
                    </th>
                    <th>
                      Gesamtes Kapital
                      <br /> (Hoch +2%)
                    </th>
                    <th>
                      Erhaltene Zinsen
                      <br /> (Hoch +2%)
                    </th>
                  </tr>
                </thead>
                <tbody className="interest-tbody">
                  <CompoundInterest
                    start={this.state.start}
                    rate={this.state.rate}
                    interval={this.state.interval}
                    dynamic={this.state.dynamic}
                    years={this.state.years}
                    tax={this.state.tax}
                    taxFree={this.state.taxFree}
                  />
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Interest;

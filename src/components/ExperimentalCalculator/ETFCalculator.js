import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import ETFTable from "./ETFTable.js"

class Experimental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 100.0,
      rate: 100.0,
      interval: 12.0,
      dynamic: 8.0,
      years: 20,
      tax: 26.375,
      taxFree: 801.0,
      gr: 7.25,
      dr: 1.75,
      oc: 1.50,
      divGrowth: 10.00,
      dyn: 2.00,
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
                          defaultValue="100.00"
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
                          defaultValue="100.00"
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
                    <td className="interest-data">Growthreturn</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="7.25"
                          name="gr"
                          aria-describedby="unit"
                          className="input-text"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Dividendreturn</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="1.75"
                          name="dr"
                          aria-describedby="unit"
                          className="input-text"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Dynamische Anpassung</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="2.00"
                          name="dyn"
                          aria-describedby="unit"
                          className="input-text"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col lg={true}>
            <div className="interest-panel">
              <Table>
                <tbody>
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
                          defaultValue="26.375"
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
                          defaultValue="801.00"
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
                  <tr className="interest-row">
                    <td className="interest-data">Ordercost</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="1.50"
                          name="oc"
                          aria-describedby="unit"
                          className="input-text"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Dividenden Wachstum</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="10.00"
                          name="divGrowth"
                          aria-describedby="unit"
                          className="input-text"
                          onChange={this.onChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="unit">%</InputGroup.Text>
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
                    <th>Eingezahlt</th>
                    <th>Einzahlungsrate</th>
                    <th>Eingezahlt<br />Netto</th>
                    <th>Portfolio<br />Wertsteigerung</th>
                    <th>Portfolio<br />Nach OC</th>
                    <th>Dividende<br />Brutto</th>
                    <th>Dividenden<br />Steuern</th>
                    <th>Dividende<br />Netto</th>
                    <th>Reinvestierte<br />Dividenden<br />Orderkosten</th>
                    <th>Portfolio<br />Jahresendwert</th>
                  </tr>
                </thead>
                <tbody className="interest-tbody">
                  <ETFTable
                    start={parseFloat(this.state.start)}
                    rate={parseFloat(this.state.rate)}
                    interval={parseFloat(this.state.interval)}
                    dynamic={parseFloat(this.state.dynamic)}
                    years={parseFloat(this.state.years)}
                    tax={parseFloat(this.state.tax)}
                    taxFree={parseFloat(this.state.taxFree)}
                    gr={parseFloat(this.state.gr)}
                    dr={parseFloat(this.state.dr)}
                    oc={parseFloat(this.state.oc)}
                    divGrowth={parseFloat(this.state.divGrowth)}
                    dyn={parseFloat(this.state.dyn)}
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

export default Experimental;

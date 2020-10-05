import React from "react";
import "./Interest.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

class Interest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 1000.0,
      rate: 1000.0,
      interval: "monatlich",
      dynamic: 8.0,
      years: 20,
      tax: 26.375,
      taxFree: 801.0,
    };
  }

  componentDidMount() {
    this.compoundInterest();
  }

  compoundInterest() {
    let table = [];
    for (let i = 0; i < this.state.years; i++) {
      let zinsen = (
        this.state.start +
        this.state.rate * 12 * i * (1.0 + this.state.dynamic / 100.0) ** i -
        (this.state.start + this.state.rate * 12 * i)
      ).toFixed(2);
      let taxes =
        zinsen > this.state.taxFree
          ? ((zinsen - this.state.taxFree) * (this.state.tax / 100.0)).toFixed(
              2
            )
          : zinsen;

      table.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{(this.state.start + this.state.rate * 12.0 * i).toFixed(2)}€</td>
          <td>{zinsen}€</td>
          <td>
            {(
              this.state.start +
              this.state.rate * 12 * i * (1.0 + this.state.dynamic / 100.0) ** i
            ).toFixed(2)}
            €
          </td>
          <td>{zinsen}€</td>
          <td>{taxes}€</td>
          <td>{(zinsen - taxes).toFixed(2)}€</td>
          <td>
            {(
              this.state.start +
              this.state.rate *
                12 *
                i *
                (1.0 + (this.state.dynamic - 2.0) / 100.0) ** i
            ).toFixed(2)}
            €
          </td>
          <td>
            {(
              this.state.start +
              this.state.rate *
                12 *
                i *
                (1.0 + (this.state.dynamic - 2.0) / 100.0) ** i -
              (this.state.start + this.state.rate * 12 * i)
            ).toFixed(2)}
            €
          </td>
          <td>
            {(
              this.state.start +
              this.state.rate *
                12 *
                i *
                (1.0 + (this.state.dynamic + 2.0) / 100.0) ** i
            ).toFixed(2)}
            €
          </td>
          <td>
            {(
              this.state.start +
              this.state.rate *
                12 *
                i *
                (1.0 + (this.state.dynamic + 2.0) / 100.0) ** i -
              (this.state.start + this.state.rate * 12 * i)
            ).toFixed(2)}
            €
          </td>
        </tr>
      );
    }
    this.setState({
      tableData: table,
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
              <Table className="interest-table">
                <tbody>
                  <tr className="interest-row">
                    <td className="interest-data">Anfangskapital</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="1000,00"
                          id="input-cost"
                          className="input-text"
                          aria-describedby="unit"
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
                          id="input-cost"
                          className="input-text"
                          aria-describedby="unit"
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
                      <FormControl as="select" id="input-interval">
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
                          id="input-cost"
                          className="input-text"
                          aria-describedby="unit"
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
                        id="input-cost"
                        className="input-text"
                      />
                    </td>
                  </tr>
                  <tr className="interest-row">
                    <td className="interest-data">Steuersatz</td>
                    <td className="interest-data">
                      <InputGroup>
                        <FormControl
                          defaultValue="26,375"
                          id="input-cost"
                          className="input-text"
                          aria-describedby="unit"
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
                          id="input-cost"
                          className="input-text"
                          aria-describedby="unit"
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Jahr</th>
                  <th>Eingezahltes Kapital</th>
                  <th>Erhaltene Zinsen</th>
                  <th>Gesamtes Kapital</th>
                  <th>Zinsen</th>
                  <th>Davon Steuern</th>
                  <th>Erhaltene Zinsen</th>
                  <th>Gesamtes Kapital (Tief -2%)</th>
                  <th>Erhaltene Zinsen (Tief -2%)</th>
                  <th>Gesamtes Kapital (Hoch +2%)</th>
                  <th>Erhaltene Zinsen (Hoch +2%)</th>
                </tr>
              </thead>
              <tbody>{this.state.tableData}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Interest;

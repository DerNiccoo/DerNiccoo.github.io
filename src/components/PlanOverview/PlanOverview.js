import React from "react";
import "./PlanOverview.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DAX = [
  "Adidas",
  "Allianz",
  "BASF",
  "Bayer",
  "Beiersdorf",
  "BMW",
  "Continental",
  "Covestro",
  "Daimler",
  "Delivery Hero",
  "Deutsche Bank",
  "Deutsche Börse",
  "Deutsche Post",
  "Deutsche Telekom",
  "Deutsche Wohnen",
  "E.ON",
  "Fresenius",
  "Fresenius Medical Care",
  "HeidelbergCement",
  "Henkel",
  "Infineon",
  "Linde",
  "Merck",
  "MTU Aero Engines",
  "Münchener Rück",
  "RWE",
  "SAP",
  "Siemens",
  "Volkswagen",
  "Vonovia",
];

class PlanOverview extends React.Component {
  constructor(props) {
    super(props);

    const data = this.makeData(20);

    let tdSparplan = [];
    let index = 0;
    data.forEach((e) => {
      tdSparplan.push(
        <tr onClick={this.handleClickTableRow}>
          <td>{index}</td>
          <td>{e.savingsplan}</td>
          <td>{e.total}</td>
          <td>{e.date}</td>
        </tr>
      );
      index++;
    });

    this.state = {
      tdSparplan: tdSparplan,
      tdShares: this.createSharesTable(30),
    };
  }

  createSharesTable(len) {
    let tdShares = [];
    let index = 0;
    const data = this.makeMockData(len);

    data.forEach((e) => {
      tdShares.push(
        <tr>
          <td>{index}</td>
          <td>{e.company}</td>
          <td>{e.shares}</td>
          <td>{e.date}</td>
        </tr>
      );
      index++;
    });

    return tdShares;
  }

  makeData(len) {
    let data = [];
    const date = new Date();

    for (let i = 0; i < len; i++) {
      data.push({
        savingsplan: "Sparplan " + i,
        total: Math.floor(Math.random() * 30) + ",00€",
        date: date.toLocaleDateString(),
      });
    }
    return data;
  }

  makeMockData(len) {
    let data = [];
    let companies = this.generateRandomCompany(len);
    const date = new Date();

    for (let i = 0; i < len; i++) {
      data.push({
        company: DAX[companies[i]],
        shares: Math.floor(Math.random() * 20) + ",00€",
        date: date.toLocaleDateString(),
      });
    }

    return data;
  }

  generateRandomCompany(len) {
    let arr = [];
    while (arr.length < len) {
      var r = Math.floor(Math.random() * 30);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }

  handleClickTableRow = (e) => {
    let tbody = e.currentTarget.parentElement;
    for (let i = 0; i < tbody.childElementCount; i++) {
      tbody.childNodes[i].classList.remove("selected-row");
    }
    e.currentTarget.className = "selected-row";

    this.setState({
      tdShares: this.createSharesTable(Math.floor(Math.random() * 10) + 1),
    });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <h2>Sparpläne</h2>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              Placeholder <br />
              Placeholder <br />
              Placeholder <br />
            </Col>
            <Col>Hier wird bald ein Diagramm sein</Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <div className="tableFixHead">
                <Table striped bordered hover id="Spraplan-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Sparplan</th>
                      <th>Summe</th>
                      <th>Datum</th>
                    </tr>
                  </thead>
                  <tbody>{this.state.tdSparplan}</tbody>
                </Table>
              </div>
            </Col>
            <Col>
              <div className="tableFixHead">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Unternehmen</th>
                      <th>Anteil</th>
                      <th>Gekauft am</th>
                    </tr>
                  </thead>
                  <tbody>{this.state.tdShares}</tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PlanOverview;

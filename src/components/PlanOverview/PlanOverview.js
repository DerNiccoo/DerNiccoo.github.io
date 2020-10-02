import React from "react";
import "./PlanOverview.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class PlanOverview extends React.Component {
  constructor(props) {
    super(props);

    const data = this.makeData(20);

    let tdSparplan = [];
    let index = 0;
    data.forEach((e) => {
      tdSparplan.push(
        <tr>
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
    };
  }

  makeData(len) {
    let data = [];
    const date = new Date();

    for (let i = 0; i < len; i++) {
      data.push({
        savingsplan: "Sparplan " + i,
        total: Math.floor(Math.random() * 30) + ",00€",
        date: date.toLocaleTimeString(),
      });
    }
    return data;
  }

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
                <Table striped bordered hover>
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
                      <th>Sparplan</th>
                      <th>Summe</th>
                      <th>Datum</th>
                    </tr>
                  </thead>
                  <tbody>{this.state.tdSparplan}</tbody>
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

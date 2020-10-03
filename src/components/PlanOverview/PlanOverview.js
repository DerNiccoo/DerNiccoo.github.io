import React from "react";
import "./PlanOverview.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import CustomTooltipContent from "./CustomTooltipContent.js";
import { mockData, mockShares, companyColor } from "./MockData.js";

class PlanOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const data = mockData(20);

    let tdSparplan = [];
    let index = 0;

    let date = new Date();

    tdSparplan.push(
      <tr key={-1}>
        <td className="input-row large-column" align="center">
          <AddIcon />
        </td>
        <td className="input-row">
          <FormControl placeholder="Name des Sparplans" id="input-name" />
        </td>
        <td className="input-row">
          <InputGroup>
            <FormControl
              placeholder="Anzulegende Gesamtsumme"
              id="input-total"
              aria-describedby="unit"
            />
            <InputGroup.Append>
              <InputGroup.Text id="unit">€</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </td>
        <td className="input-row large-column">
          <FormControl
            defaultValue={date.toLocaleDateString()}
            id="input-date"
          />
        </td>
      </tr>
    );

    data.forEach((e) => {
      tdSparplan.push(
        <tr onClick={this.handleClickTableRow} key={index}>
          <td className="large-column">{index}</td>
          <td>{e.savingsplan}</td>
          <td>{e.total}</td>
          <td className="large-column">{e.date}</td>
        </tr>
      );
      index++;
    });

    let shares = this.createSharesTable(30);

    this.setState({
      tdSparplan: tdSparplan,
      tdShares: shares,
    });
  }

  createSharesTable(len) {
    let tdShares = [];
    let index = 0;
    const data = mockShares(len);
    let total = 0.0;

    data.forEach((e) => {
      total += parseFloat(e.shares);
    });

    let pieChart = [];
    let date = new Date();
    tdShares.push(
      <tr key={-1}>
        <td className="input-row large-column" align="center">
          <AddIcon />
        </td>
        <td className="input-row">
          <FormControl placeholder="Unternehmen" id="input-company" />
        </td>
        <td className="input-row">
          <InputGroup>
            <FormControl
              placeholder="Anteilige Summe"
              id="input-part"
              aria-describedby="unit"
            />
            <InputGroup.Append>
              <InputGroup.Text id="unit">€</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </td>
        <td className="input-row large-column">
          <FormControl
            defaultValue={date.toLocaleDateString()}
            id="input-date"
          />
        </td>
      </tr>
    );

    data.forEach((e) => {
      tdShares.push(
        <tr key={index}>
          <td className="large-column">{index}</td>
          <td>{e.company}</td>
          <td>{e.shares}</td>
          <td className="large-column">{e.date}</td>
        </tr>
      );
      index++;
      pieChart.push({
        name: e.company,
        value: parseFloat(e.shares),
        fill: companyColor(e.company),
        percent: ((parseFloat(e.shares) / total) * 100.0).toFixed(2),
      });
    });

    this.setState({
      sharesData: pieChart,
    });

    return tdShares;
  }

  handleClickTableRow = (e) => {
    if (e.currentTarget.classList.contains("selected-row")) {
      e.currentTarget.classList.remove("selected-row");

      this.setState({
        tdShares: this.createSharesTable(30),
      });

      return;
    }

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
    let table = "";
    if (this.state.sharesData !== null) {
      table = (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={this.state.sharesData}
              dataKey="value"
              animationBegin={0}
            ></Pie>
            <Legend /*layout="vertical" align="right" verticalAlign="top"*/ />
            <Tooltip content={<CustomTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <div>
        <Row>
          <Col>
            <h2>Sparpläne</h2>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={true}>
            <div className="info-panel">
              <Table>
                <tbody>
                  <tr>
                    <td className="info-data">
                      Anzahl Eindeutig Investierte Unternehmen
                    </td>
                    <td className="info-data">30</td>
                  </tr>
                  <tr>
                    <td className="info-data">Gesamtsumme der Investitionen</td>
                    <td className="info-data">1564,00€</td>
                  </tr>
                  <tr>
                    <td className="info-data">Anzahl der Sparpläne</td>
                    <td className="info-data">20</td>
                  </tr>
                  <tr>
                    <td className="info-data">Anzahl der einzelnen Posten</td>
                    <td className="info-data">150</td>
                  </tr>
                  <tr>
                    <td className="info-data">
                      Unternehmen mit den meisten Posten
                    </td>
                    <td className="info-data">SAP</td>
                  </tr>
                  <tr>
                    <td className="info-data">Summe aller Posten von SAP</td>
                    <td className="info-data">110,00€</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col lg={true}>{table}</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <div className="tableFixHead">
              <Table striped bordered hover id="Spraplan-table">
                <thead>
                  <tr>
                    <th className="large-column">#</th>
                    <th>Sparplan</th>
                    <th>Summe</th>
                    <th className="large-column">Datum</th>
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
                    <th className="large-column">#</th>
                    <th>Unternehmen</th>
                    <th>Anteil</th>
                    <th className="large-column">Gekauft am</th>
                  </tr>
                </thead>
                <tbody>{this.state.tdShares}</tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const AddIcon = () => {
  return (
    <div>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fad"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="add-icon"
      >
        <g className="fa-group">
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276a12 12 0 0 1-12 12h-92v92a12 12 0 0 1-12 12h-56a12 12 0 0 1-12-12v-92h-92a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h92v-92a12 12 0 0 1 12-12h56a12 12 0 0 1 12 12v92h92a12 12 0 0 1 12 12z"
            className="fa-secondary"
          ></path>
          <path
            fill="currentColor"
            d="M400 284a12 12 0 0 1-12 12h-92v92a12 12 0 0 1-12 12h-56a12 12 0 0 1-12-12v-92h-92a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h92v-92a12 12 0 0 1 12-12h56a12 12 0 0 1 12 12v92h92a12 12 0 0 1 12 12z"
            className="fa-primary"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default PlanOverview;

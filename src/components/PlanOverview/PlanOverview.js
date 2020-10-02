import React from "react";
import "./PlanOverview.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

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
    this.state = {};
  }

  componentDidMount() {
    const data = this.makeData(20);

    let tdSparplan = [];
    let index = 0;

    let date = new Date();

    tdSparplan.push(
      <tr>
        <td className="input-row large-column"></td>
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
        <tr onClick={this.handleClickTableRow}>
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
    const data = this.makeMockData(len);

    let pieChart = [];
    let date = new Date();
    tdShares.push(
      <tr>
        <td className="input-row large-column"></td>
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
        <tr>
          <td className="large-column">{index}</td>
          <td>{e.company}</td>
          <td>{e.shares}</td>
          <td className="large-column">{e.date}</td>
        </tr>
      );
      index++;
      pieChart.push({
        name: e.company,
        value: parseInt(e.shares),
        fill: this.companyColor(e.company),
      });
    });

    this.setState({
      sharesData: pieChart,
    });

    return tdShares;
  }

  companyColor(company) {
    if (company === "Adidas") {
      return "#FAFAFA";
    } else if (company === "Allianz") {
      return "#003781";
    } else if (company === "BASF") {
      return "#010101";
    } else if (company === "Bayer") {
      return "#85CC28";
    } else if (company === "Beiersdorf") {
      return "#00126C";
    } else if (company === "BMW") {
      return "#48A5D1";
    } else if (company === "Continental") {
      return "#FFA500";
    } else if (company === "Covestro") {
      return "#84519A";
    } else if (company === "Daimler") {
      return "#F9F9F9";
    } else if (company === "Delivery Hero") {
      return "#D22028";
    } else if (company === "Deutsche Bank") {
      return "#000FA8";
    } else if (company === "Deutsche Börse") {
      return "#00008D";
    } else if (company === "Deutsche Post") {
      return "#FFCC00";
    } else if (company === "Deutsche Telekom") {
      return "#E2007A";
    } else if (company === "Deutsche Wohnen") {
      return "#1005A1";
    } else if (company === "E.ON") {
      return "#F21C0A";
    } else if (company === "Fresenius") {
      return "#1B1655";
    } else if (company === "Fresenius Medical Care") {
      return "#001D92";
    } else if (company === "HeidelbergCement") {
      return "#019C41";
    } else if (company === "Henkel") {
      return "#EC1B23";
    } else if (company === "Infineon") {
      return "#0066B3";
    } else if (company === "Linde") {
      return "#05BAE9";
    } else if (company === "Merck") {
      return "#0E69B0";
    } else if (company === "MTU Aero Engines") {
      return "#93B0C5";
    } else if (company === "Münchener Rück") {
      return "#004C86";
    } else if (company === "RWE") {
      return "#1A3F76";
    } else if (company === "SAP") {
      return "#06ACEA";
    } else if (company === "Siemens") {
      return "#058B8C";
    } else if (company === "Volkswagen") {
      return "#001E50";
    } else if (company === "Vonovia") {
      return "#004658";
    } else {
      console.log(company);
      return "#000000";
    }
  }

  ///////////////Nur um Daten zu generieren///////////////
  makeData(len) {
    let data = [];
    const date = new Date();

    for (let i = 0; i < len; i++) {
      data.push({
        savingsplan: "Sparplan " + i,
        total: Math.floor(Math.random() * 30 + 1) + ",00€",
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
        shares: Math.floor(Math.random() * 20 + 1) + ",00€",
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
  ///////////////////////////////////////////

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
            <Pie data={this.state.sharesData} dataKey="value"></Pie>
            <Legend /*layout="vertical" align="right" verticalAlign="top"*/ />
            <Tooltip />
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

export default PlanOverview;

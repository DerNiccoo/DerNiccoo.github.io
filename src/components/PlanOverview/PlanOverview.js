import React from "react";
import "./PlanOverview.css";
import Table from "react-bootstrap/Table";
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import CustomTooltipContent from "./CustomTooltipContent.js";
import { mockShares, companyColor } from "./MockData.js";
import AddIcon from "../Icons/AddIcon.js";
import CustomModal from "../Modal/Modal.js";
import { displayNumber } from "../Helper/Helper.js";

class PlanOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    this.removeItem = React.createRef();

    document.addEventListener("contextmenu", this.contextmenu, true)
  }

  contextmenu = (e) => {
    if(e.target.id === "table-removable") { // identify your element here. You can use e.target.id, or e.target.className, e.target.classList etc...
        e.preventDefault();
        e.stopPropagation();
  
        let parent = e.target.parentElement;
  
        this.removeItem.current = {
          id: parent.children[0].innerText,
          savingsplan: parent.children[1].innerText,
          total: parent.children[2].innerText,
          date: parent.children[3].innerText,
        };
        this.setState({
          modal: true,
        })
    }
  }

  handleOnSubmit = (event) => {
    let name = document.getElementById("input-name").value;
    let total = document.getElementById("input-total").value;
    let date = document.getElementById("input-date").value;

    let entry = {
      savingsplan: name,
      total: displayNumber(parseFloat(total.replace(",", ".")).toFixed(2)) + "€",
      date: date,
    };

    let values = JSON.parse(localStorage.getItem("sparpläne")) || [];
    values.push(entry);
    localStorage.setItem("sparpläne", JSON.stringify(values));
    this.setState({
      modal: false,
    });
  }

  handleRemove = () => {
    let values = [];
    let removedOne = false;
    let removeItem  = this.removeItem.current;
    let data = JSON.parse(localStorage.getItem("sparpläne")) || [];

    data.forEach((element) => {
      let equal = true;
      Object.keys(element).forEach(function (key) {
        if (element[key] !== removeItem[key]) {
          equal = false;
        }
      });
      if (equal === false || removedOne) {
        values.push(element);
      } else if (equal) {
        removedOne = true;
      }
    });
    localStorage.setItem("sparpläne", JSON.stringify(values));
    this.setState({modal: false})
  }


  createTables() {
    const data = JSON.parse(localStorage.getItem("sparpläne")) || [];

    let tdSparplan = [];
    let index = 0;

    let date = new Date();

    tdSparplan.push(
      <tr key={-1}>
        <td className="input-row large-column" align="center">
          <AddIcon onClick={this.handleOnSubmit}/>
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
          <td className="large-column" id="table-removable">{index}</td>
          <td id="table-removable">{e.savingsplan}</td>
          <td id="table-removable">{e.total}</td>
          <td className="large-column" id="table-removable">{e.date}</td>
        </tr>
      );
      index++;
    });

    const [shares, sharesData] = this.createSharesTable(30);

    return [tdSparplan, shares, sharesData];
  }

  componentDidMount() {
    this.createTables();
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

    return [tdShares, pieChart];
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
    const [tdSparplan, tdShares, sharesData] = this.createTables()

    if (sharesData !== null) {
      table = (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={sharesData}
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
                <tbody>{tdSparplan}</tbody>
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
                <tbody>{tdShares}</tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <CustomModal
          show={this.state.modal}
          handleClose={() => this.setState({modal: false})}
          handleSubmit={this.handleRemove}
          title="Löschen"
          body="Möchtest du den Eintrag wirklich löschen?"
          submit="Löschen"
        />
      </div>
    );
  }
}

export default PlanOverview;

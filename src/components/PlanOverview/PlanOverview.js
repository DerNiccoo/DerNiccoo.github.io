import React from "react";
import "./PlanOverview.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";

import CustomTooltipContent from "./CustomTooltipContent.js";
import { companyColor } from "./MockData.js"; // Das hier könnte später noch in eine Helper klasse gesteckt werden
import CustomModal from "../Modal/Modal.js";
import { SharesTable, PlansTable } from "./CustomTables.js"

/*
  ### savingsplans:
  savingsplan: 
  total:
  date:
  shares: [
    company:
    shares: -> rename?
    date:
  ]
  pieChart: [
    name: 
    value: 
    fill:
    percent: 
  ]


*/

class PlanOverview extends React.Component {
  constructor(props) {
    super(props);

    let plans = JSON.parse(localStorage.getItem("sparpläne")) || [];
    let total = this.calculateTotal(plans);

    this.state = {
      plans: plans,
      total: total,
      totalChart: this.pieChart(total),
      activ: -1,
    };

    this.removeItem = React.createRef();
    this.removeType = React.createRef();

    document.addEventListener("contextmenu", this.contextmenu, true)
  }

  calculateTotal(plans) {
    let total = [];

    plans.forEach(plan => {
      plan.shares.forEach(share => {
        let index = -1;
        for (let i = 0; i < total.length; i++) {
          if (total[i].company === share.company) {
            index = i;
          }
        };

        if (index === -1) {
          total.push({
            company: share.company,
            shares: parseFloat(share.shares),
          });
        } else {
          total[index].shares += parseFloat(share.shares);
        }
      });
    });

    return total;
  }

  pieChart(shares) {
    let pieChart = []
    let total = 0.0;

    shares.forEach((e) => {
      total += parseFloat(e.shares);
    });

    shares.forEach((e) => {
      pieChart.push({
        name: e.company,
        value: parseFloat(e.shares),
        fill: companyColor(e.company),
        percent: ((parseFloat(e.shares) / total) * 100.0).toFixed(2),
      });
    });   

    return pieChart;
  }

  contextmenu = (e) => {

    if((e.target.id === "table-removable-shares" && this.state.activ !== -1) || e.target.id === "table-removable-plans") { // identify your element here. You can use e.target.id, or e.target.className, e.target.classList etc...
      e.preventDefault();
      e.stopPropagation();

      let parent = e.target.parentElement;

      if (e.target.id === "table-removable-plans") {
        this.removeType.current = "plans"
        this.removeItem.current = {
          savingsplan: parent.children[1].innerText,
          date: parent.children[3].innerText,
        };
      } else if (e.target.id === "table-removable-shares") {
        this.removeType.current = "shares"
        this.removeItem.current = {
          company: parent.children[1].innerText,
          date: parent.children[3].innerText,
        };        
      }

      this.setState({
        modal: true,
      })
    }
  }

  handleOnSubmitShares = (event) => {
    let comp = document.getElementById("input-company").value;
    let shares = document.getElementById("input-part").value;
    let date = document.getElementById("input-date-shares").value;

    let entry = {
      company: comp,
      shares: parseFloat(String(shares).replace(",", ".")),
      date: date,
    };

    let plans = this.state.plans;
    plans[this.state.activ].shares.push(entry);
    plans[this.state.activ].pieChart = this.pieChart(plans[this.state.activ].shares);
    localStorage.setItem("sparpläne", JSON.stringify(plans));

    let total = this.calculateTotal(plans);
    
    this.setState({
      plans: plans,
      total: total,
      totalChart: this.pieChart(total),
    });
  }

  handleOnSubmitPlans = (event) => {
    let name = document.getElementById("input-name").value;
    let total = document.getElementById("input-total").value;
    let date = document.getElementById("input-date").value;

    let entry = {
      savingsplan: name,
      total: parseFloat(String(total).replace(",", ".")),
      date: date,
      shares: [],
      pieChart: [],
    };

    let plans = this.state.plans;
    plans.push(entry);
    localStorage.setItem("sparpläne", JSON.stringify(plans));
    this.setState({
      plans: plans,
    });
  }

  handleRemove = () => {
    let values = [];
    let removedOne = false;
    let removeItem  = this.removeItem.current;
    let data = this.state.plans;

    if (this.removeType.current === "shares") {
      data = data[this.state.activ].shares;
    }

    data.forEach((element) => {
      let equal = true;
      Object.keys(removeItem).forEach(function (key) {
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

    let newPlans = this.state.plans;
    if (this.removeType.current === "shares") {
      newPlans[this.state.activ].shares = values;
      newPlans[this.state.activ].pieChart = this.pieChart(values);
    } else {
      newPlans = values;
    }

    localStorage.setItem("sparpläne", JSON.stringify(newPlans));
    let total = this.calculateTotal(newPlans);

    this.setState({
      modal: false,
      plans: newPlans,
      total: total,
      totalChart: this.pieChart(total),
      activ: this.removeType.current === "shares" ? this.state.activ : -1,
    })
  }

  handleClickTableRow = (e) => {
    if (e.currentTarget.classList.contains("selected-row")) {
      e.currentTarget.classList.remove("selected-row");

      this.setState({
        activ: -1,
      });

      return;
    }

    let tbody = e.currentTarget.parentElement;
    for (let i = 0; i < tbody.childElementCount; i++) {
      tbody.childNodes[i].classList.remove("selected-row");
    }
    
    e.currentTarget.className = "selected-row";

    this.setState({
      activ: e.currentTarget.rowIndex - 2,
    });
  };

  render() {
    let pieChart = "";

    if (this.state.totalChart !== null) {
      pieChart = (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={this.state.activ === -1 ? this.state.totalChart : this.state.plans[this.state.activ].pieChart}
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
          <Col lg={true}>{pieChart}</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <PlansTable 
              submit = {this.handleOnSubmitPlans}
              onClick = {this.handleClickTableRow}
              data = {this.state.plans}
            />
          </Col>
          <Col>
            <SharesTable 
              submit = {this.handleOnSubmitShares}
              inputRow = {this.state.activ === -1 ? false : true}
              data = {this.state.activ === -1 ? this.state.total : this.state.plans[this.state.activ].shares}
            />
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

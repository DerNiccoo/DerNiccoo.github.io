import React from "react";
import "./PlanOverview.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";

import CustomTooltipContent from "./CustomTooltipContent.js";
import { companyColor } from "./MockData.js"; // Das hier könnte später noch in eine Helper klasse gesteckt werden
import CustomModal from "../Modal/Modal.js";
import { SharesTable, PlansTable } from "./CustomTables.js";
import { displayNumber } from "../Helper/Helper.js";

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

/**
 * Savingsplan subsite. The structure of the stored data are shown above. The total data are always calculated with a render call, this way it can include real time stock data. 
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

  /**
   * Used to calculate the total data of the savingsplans. 
   * @param {*} plans 
   */
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

  /**
   * Here all information related to the info panel will be calculated. The total info and plans info are needed in order to calculate all data.
   * Be sure that all data are availabe inside the state.
   */
  calculateInfoPanel() {
    let totalCost = 0.0;
    let biggestInvest = "";
    let biggestInvestCost = 0.0;

    this.state.total.forEach(element => {
      totalCost += element.shares;
      if (element.shares > biggestInvestCost) {
        biggestInvestCost = element.shares;
        biggestInvest = element.company;
      }
    });

    let totalShareCount = 0;

    this.state.plans.forEach(element => {
      totalShareCount += element.shares.length;
    });

    let infoPanel = {
      uniqueStocks: this.state.total.length,
      countPlans: this.state.plans.length,
      totalCost: totalCost,
      totalShareCount: totalShareCount,
      biggestInvest: biggestInvest,
      biggestInvestCost: biggestInvestCost,
    };

    return infoPanel;
  }

  /**
   * This Method takes shares from a savingsplan and calculates the pieChart data even for the total data. 
   * @param {*} shares 
   */
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

  /**
   * Defines the right click method inside tables with deletable data. In this method both reference variables are set according the type of item that should be deleted.
   * @param {*} e 
   */
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

  /**
   * Removes a stored savingplan or company from a savingsplan. The reference variable removeType determines which of those should be deleted. 
   * The reference variable removeItem contains a dictionary of variables that should be the same for an item to be deleted. 
   */
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
    let infoPanel = this.calculateInfoPanel();

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
                    <td className="info-data">{infoPanel.uniqueStocks}</td>
                  </tr>
                  <tr>
                    <td className="info-data">Gesamtsumme der Investitionen</td>
                    <td className="info-data">{displayNumber(infoPanel.totalCost)}€</td>
                  </tr>
                  <tr>
                    <td className="info-data">Anzahl der Sparpläne</td>
                    <td className="info-data">{infoPanel.countPlans}</td>
                  </tr>
                  <tr>
                    <td className="info-data">Anzahl der einzelnen Posten</td>
                    <td className="info-data">{infoPanel.totalShareCount}</td>
                  </tr>
                  <tr>
                    <td className="info-data">
                      Unternehmen mit der größten Investition
                    </td>
                    <td className="info-data">{infoPanel.biggestInvest}</td>
                  </tr>
                  <tr>
                    <td className="info-data">Summe der größten Investition in ein Unternehmen</td>
                    <td className="info-data">{displayNumber(infoPanel.biggestInvestCost)}€</td>
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

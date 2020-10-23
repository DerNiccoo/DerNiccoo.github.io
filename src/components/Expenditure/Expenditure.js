import React from "react";
import "./Expenditure.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ExpenditureTooltip from "./ExpenditureTooltip";
import SpendingsTable from "./Spendings.js";

/**
 * Mock data for current testing
 */
const data = [
  {
    Monat: "Januar",
    Summe: 750,
    Haushalt: 500,
    Lebensmittel: 150,
    Unterhaltung: 15,
    Verträge: 38.95,
  },
  {
    Monat: "Februar",
    Summe: 552,
    Haushalt: 500,
    Lebensmittel: 20,
    Unterhaltung: 0,
    Verträge: 38.95,
  },
  {
    Monat: "März",
    Summe: 836,
    Haushalt: 550,
    Lebensmittel: 150,
    Unterhaltung: 15,
    Verträge: 38.95,
  },
  {
    Monat: "April",
    Summe: 972.56,
    Haushalt: 510,
    Lebensmittel: 150,
    Unterhaltung: 300,
    Verträge: 38.95,
  },
  {
    Monat: "Mai",
    Summe: 516,
    Haushalt: 450,
    Lebensmittel: 50,
    Unterhaltung: 0,
    Verträge: 38.95,
  },
  {
    Monat: "Juni",
    Summe: 1008,
    Haushalt: 498,
    Lebensmittel: 200,
    Unterhaltung: 280,
    Verträge: 38.95,
  },
  {
    Monat: "Juli",
    Summe: 768,
    Haushalt: 512,
    Lebensmittel: 75,
    Unterhaltung: 75,
    Verträge: 38.95,
  },
  {
    Monat: "August",
    Summe: 668,
    Haushalt: 500,
    Lebensmittel: 100,
    Unterhaltung: 35,
    Verträge: 38.95,
  },
  {
    Monat: "September",
    Summe: 812,
    Haushalt: 495,
    Lebensmittel: 200,
    Unterhaltung: 200,
    Verträge: 38.95,
  },
  {
    Monat: "Oktober",
    Summe: 990,
    Haushalt: 612,
    Lebensmittel: 250,
    Unterhaltung: 150,
    Verträge: 38.95,
  },
  {
    Monat: "November",
    Summe: 612,
    Haushalt: 399,
    Lebensmittel: 90,
    Unterhaltung: 27.15,
    Verträge: 38.95,
  },
  {
    Monat: "Dezember",
    Summe: 1312.85,
    Haushalt: 610,
    Lebensmittel: 250,
    Unterhaltung: 470,
    Verträge: 38.95,
  },
];

/**
 * This class defines the subpage Expenditure. Here the user should be able to enter his spendings to create a better overview of his savings. 
 * There are different intervals and categories to choose from to get a more detailed view on the financiel data.
 */
class Expenditure extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.updateInfoData();
  }

  // All of those methods should go to the helper.js
  getDate(stringDate) {
    let split = stringDate.split('.');
    return new Date(split[2] + '-' + split[1] + '-' + split[0])
  }

  weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
  }

  getFloat(stringMoney) {
    let money = stringMoney.replace('€', '').replace(',', '.');
    return parseFloat(money);
  }

  updateInfoData() {
    let spendings = JSON.parse(localStorage.getItem("spendings")) || [];
    let montly = [];
    let weekly = [];
    let once = [];
    let currentMonthSpendings = 0.0;
    let currentMonthUnique = 0.0;
    const currentDate = new Date();
    const currentMonth = new Date(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1));
    const nextMonth = new Date(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1));
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    spendings.forEach(element => {
      element.date = this.getDate(element.date);

      if (element.interval === "Monatlich") {
        montly.push(element);
      } else if (element.interval === "Einmalig") {
        once.push(element);
      } else {
        weekly.push(element);
      }

      if (element.date < nextMonth && element.interval === "Monatlich") {
        currentMonthSpendings += this.getFloat(element.amount);
      } else if (element.interval === "Einmalig" && element.date >= currentMonth && element.date < nextMonth) {
        currentMonthSpendings += this.getFloat(element.amount);
        currentMonthUnique += this.getFloat(element.amount);
      } else if (element.date < nextMonth && element.interval === "Wöchentlich") {
        currentMonthSpendings += ((this.weeksBetween(element.date, currentDate) - this.weeksBetween(element.date, currentMonth)) * this.getFloat(element.amount));
      }

    });

    return ({
      monthlySpending: currentMonthSpendings,
      repeatingSpendingsCount: montly.length + weekly.length,
      repeatingSpendings: currentMonthSpendings - currentMonthUnique,
      uniqueCount: once.length,
      uniqueSpendings: currentMonthUnique,
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>Ausgaben</h2>
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
                      Gesamtsumme aktueller monatlicher Ausgaben
                    </td>
                    <td className="info-data">{this.state.monthlySpending}€</td>
                  </tr>
                  <tr>
                    <td className="info-data">
                      Anazhl an wiederholenden Ausgaben
                    </td>
                    <td className="info-data">{this.state.repeatingSpendingsCount}</td>
                  </tr>
                  <tr>
                    <td className="info-data">
                      Summe der wiederholenden Ausgaben
                    </td>
                    <td className="info-data">{this.state.repeatingSpendings}€</td>
                  </tr>
                  <tr>
                    <td className="info-data">
                      Anzahl an einmaligen Ausgaben diesen Monat
                    </td>
                    <td className="info-data">{this.state.uniqueCount}</td>
                  </tr>
                  <tr>
                    <td className="info-data">
                      Summe der einmaligen Ausgaben diesen Monat
                    </td>
                    <td className="info-data">{this.state.uniqueSpendings}€</td>
                  </tr>
                  <tr>
                    <td className="info-data">
                      Insgesamt höchste Ausgaben in einem Monat
                    </td>
                    <td className="info-data">1207,37€</td>
                  </tr>
                  <tr>
                    <td className="info-data">
                      Insgesamt niedrigste Ausgaben in einem Monat
                    </td>
                    <td className="info-data">672,76€</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col lg={true}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="Monat" />
                <YAxis unit="€" />
                <Tooltip content={<ExpenditureTooltip />} />
                <Area
                  type="monotone"
                  unit="€"
                  dataKey="Summe"
                  stroke="#FF0000"
                  fill="#ffcccb"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <SpendingsTable
              update={this.updateInfoData}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Expenditure;

import React from "react";
import "./Expenditure.css";
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

import SpendingsTable from "./Spendings.js";

const data = [
  {
    name: "Januar",
    total: 750,
    haushalt: 500,
    lebensmittel: 150,
    unterhaltung: 15,
    verträge: 38.95,
  },
  {
    name: "Februar",
    total: 552,
    haushalt: 500,
    lebensmittel: 20,
    unterhaltung: 0,
    verträge: 38.95,
  },
  {
    name: "März",
    total: 836,
    haushalt: 550,
    lebensmittel: 150,
    unterhaltung: 15,
    verträge: 38.95,
  },
  {
    name: "April",
    total: 972.56,
    haushalt: 510,
    lebensmittel: 150,
    unterhaltung: 300,
    verträge: 38.95,
  },
  {
    name: "Mai",
    total: 516,
    haushalt: 450,
    lebensmittel: 50,
    unterhaltung: 0,
    verträge: 38.95,
  },
  {
    name: "Juni",
    total: 1008,
    haushalt: 498,
    lebensmittel: 200,
    unterhaltung: 280,
    verträge: 38.95,
  },
  {
    name: "Juli",
    total: 768,
    haushalt: 512,
    lebensmittel: 75,
    unterhaltung: 75,
    verträge: 38.95,
  },
  {
    name: "August",
    total: 668,
    haushalt: 500,
    lebensmittel: 100,
    unterhaltung: 35,
    verträge: 38.95,
  },
  {
    name: "September",
    total: 812,
    haushalt: 495,
    lebensmittel: 200,
    unterhaltung: 200,
    verträge: 38.95,
  },
  {
    name: "Oktober",
    total: 990,
    haushalt: 612,
    lebensmittel: 250,
    unterhaltung: 150,
    verträge: 38.95,
  },
  {
    name: "November",
    total: 612,
    haushalt: 399,
    lebensmittel: 90,
    unterhaltung: 27.15,
    verträge: 38.95,
  },
  {
    name: "Dezember",
    total: 1312.85,
    haushalt: 610,
    lebensmittel: 250,
    unterhaltung: 470,
    verträge: 38.95,
  },
];

class Expenditure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <Col>Und hier könnte ihre Werbung stehen. jk.</Col>
          <Col>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis unit="€" />
                <Tooltip />
                <Area
                  type="monotone"
                  unit="€"
                  dataKey="total"
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
            <SpendingsTable />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Expenditure;

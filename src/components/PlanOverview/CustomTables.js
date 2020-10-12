import React from "react";
import "./PlanOverview.css";
import Table from "react-bootstrap/Table";
import AddIcon from "../Icons/AddIcon.js"
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { displayNumber } from "../Helper/Helper.js";


/*
  Hier sollten nur die roh Daten rein gereicht werden.

*/

function SharesTable(props) {

  let tbody = []
  let date = new Date();

  if (props.inputRow) {
    tbody.push(
      <tr key={-1}>
        <td className="input-row large-column" align="center">
          <AddIcon onClick={props.submit}/>
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
            id="input-date-shares"
          />
        </td>
      </tr>
    );
  }
  
  let index = 0;
  /* Das könnte in eine Funktion ausgelagert werden, aber ich will mir die option offen halten Klassen zu ändern bzw leichter änderungen zu machen */
  props.data.forEach((e) => {
    tbody.push(
      <tr key={index}>
        <td className="large-column" id="table-removable-shares">{index}</td>
        <td id="table-removable-shares">{e.company}</td>
        <td id="table-removable-shares">{displayNumber(parseFloat(String(e.shares).replace(",", ".")).toFixed(2)) + "€"}</td>
        <td className="large-column" id="table-removable-shares">{e.date}</td>
      </tr>
    );
    index++;
  });

  return (
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
      <tbody>{tbody}</tbody>
    </Table>
  </div>
  );
}

function PlansTable(props) {
  let tbody = []
  let date = new Date();

  tbody.push(
    <tr key={-1}>
    <td className="input-row large-column" align="center">
      <AddIcon onClick={props.submit}/>
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
  </tr>  );
  
  let index = 0;
  
  props.data.forEach((e) => {
    tbody.push(
      <tr onClick={props.onClick} key={index}>
        <td className="large-column" id="table-removable-plans">{index}</td>
        <td id="table-removable-plans">{e.savingsplan}</td>
        <td id="table-removable-plans">{displayNumber(parseFloat(String(e.total).replace(",", ".")).toFixed(2)) + "€"}</td>
        <td className="large-column" id="table-removable-plans">{e.date}</td>
      </tr>
    );
    index++;
  });

  return (
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
        <tbody>{tbody}</tbody>
      </Table>
    </div>
  );
}

export { SharesTable, PlansTable }
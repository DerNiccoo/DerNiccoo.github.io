import React, { useState, useRef } from "react";
import "./Spendings.css";
import { useTable, useSortBy } from "react-table";
import Table from "react-bootstrap/Table";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import AddIcon from "../Icons/AddIcon.js";
import CustomModal from "../Modal/Modal.js";
import { displayNumber } from "../Helper/Helper.js"

/**
 * Simple table using react-table for the Expenditure page. The first row inside the table offers input fields to enter new data, thanks to react-table it allows sorting of all rows besides the input rows.
 * All of the Datamanagement is handles inside this component using the localStorage "spendings" as a container. 
 * 
 * @param {*} props Not needed yet 
 */
const SpendingsTable = (props) => {
  const [data, setData] = useState(
    React.useMemo(() => JSON.parse(localStorage.getItem("spendings")) || [], [])
  );

  const [modal, setModal] = useState(false);
  const removeItem = useRef(0);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Summe",
        accessor: "amount",
      },
      {
        Header: "Kategorie",
        accessor: "categorie",
      },
      {
        Header: "Intervall",
        accessor: "interval",
      },
      {
        Header: "Datum",
        accessor: "date",
        sortType: "basic", //Das müsste eig. Datetime sein, nur irgendwie sagt er mir dann immer, dass ihm was fehlt?!
      },
    ],
    []
  );

  /**
   * This Adds the change of the right click inside this table. It stores the information about the clicked item and opens the modal dialog to check for confirmation. 
   */
  document.addEventListener("contextmenu", function(e) {
    if(e.target.id === "table-cell") { // identify your element here. You can use e.target.id, or e.target.className, e.target.classList etc...
        e.preventDefault();
        e.stopPropagation();
  
        let parent = e.target.parentElement;
  
        removeItem.current = {
          name: parent.children[0].innerText,
          amount: parent.children[1].innerText,
          categorie: parent.children[2].innerText,
          interval: parent.children[3].innerText,
          date: parent.children[4].innerText,
        };
        setModal(true)
    }
  }, true) // true means you are executing your function during capture phase

  /**
   * Checks each key of the removeItem object if its equal to a given element in the spendings data (table data) if yes, remove it by not saving that entry.
   * Updates the localStorage and the table Data to force a rerender
   */
  function handleRemove() {
    let values = [];
    let removedOne = false;

    data.forEach((element) => {
      let equal = true;
      Object.keys(element).forEach(function (key) {
        if (element[key] !== removeItem.current[key]) {
          equal = false;
        }
      });
      if (equal === false || removedOne) {
        values.push(element);
      } else if (equal) {
        removedOne = true;
      }
    });
    localStorage.setItem("spendings", JSON.stringify(values));
    setData([...values]);
    setModal(false);
  }

  /**
   * Creates new spendings by the values from the forms. 
   * 
   * @param {*} event Not used yet 
   */
  function handleOnSubmit(event) {
    let name = document.getElementById("input-name").value;
    let amount = document.getElementById("input-cost").value;
    let cat = document.getElementById("input-categorie").value;
    let interval = document.getElementById("input-interval").value;
    let date = document.getElementById("input-date").value;

    let entry = {
      name: name,
      amount: displayNumber(parseFloat(amount.replace(",", ".")).toFixed(2)) + "€",
      categorie: cat,
      interval: interval,
      date: date,
    };

    let values = data;
    values.push(entry);
    localStorage.setItem("spendings", JSON.stringify(values));
    setData([...values]);
  }

  // more table creation code
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Render the UI for your table
  return (
    <div>
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="sorted-header"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          <tr key={-1}>
            <td className="input-row" align="center">
              <FormControl placeholder="Bezeichner" id="input-name" />
            </td>
            <td className="input-row">
              <InputGroup>
                <FormControl
                  placeholder="Gesamt Betrag"
                  id="input-cost"
                  aria-describedby="unit"
                />
                <InputGroup.Append>
                  <InputGroup.Text id="unit">€</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </td>
            <td className="input-row">
              <FormControl as="select" id="input-categorie">
                <option>Haushalt</option>
                <option>Lebensmittel</option>
                <option>Unterhaltung</option>
                <option>Verträge</option>
              </FormControl>
            </td>
            <td className="input-row">
              <FormControl as="select" id="input-interval">
                <option>Monatlich</option>
                <option>Wöchentlich</option>
                <option>Einmalig</option>
              </FormControl>
            </td>
            <td className="input-row confirm-row">
              <FormControl
                defaultValue={new Date().toLocaleDateString()}
                id="input-date"
              />
              <AddIcon onClick={handleOnSubmit} />
            </td>
          </tr>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()} id="table-cell">{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CustomModal
        show={modal}
        handleClose={() => setModal(false)}
        handleSubmit={handleRemove}
        title="Löschen"
        body="Möchtest du den Eintrag wirklich löschen?"
        submit="Löschen"
      />
    </div>
  );
};

export default SpendingsTable;

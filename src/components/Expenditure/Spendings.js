import React from "react";
import "./Spendings.css";
import { useTable, useSortBy } from "react-table";
import Table from "react-bootstrap/Table";

const SpendingsTable = (props) => {
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

  const data = React.useMemo(
    () => [
      {
        name: "Miete",
        amount: "420,69€",
        categorie: "Haushalt",
        interval: "Monatlich",
        date: "01.10.2020",
      },
      {
        name: "Internet",
        amount: "29,99€",
        categorie: "Haushalt",
        interval: "Monatlich",
        date: "01.10.2020",
      },
      {
        name: "Einkaufen Lebensmittel",
        amount: "15,00€",
        categorie: "Lebensmittel",
        interval: "Wöchentlich",
        date: "28.09.2020",
      },
      {
        name: "Unterhaltung",
        amount: "15,00€",
        categorie: "Unterhaltung",
        interval: "Wöchentlich",
        date: "28.09.2020",
      },
      {
        name: "Sport",
        amount: "39,99€",
        categorie: "Verträge",
        interval: "Monatlich",
        date: "01.10.2020",
      },
      {
        name: "Kino",
        amount: "24,95€",
        categorie: "Unterhaltung",
        interval: "Einmalig",
        date: "04.10.2020",
      },
    ],
    []
  );

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
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SpendingsTable;

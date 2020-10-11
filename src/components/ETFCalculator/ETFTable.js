import React from "react";
import {displayNumber, calculateTaxes} from "../Helper/Helper.js"

export default function ETFTable(props) {
  let table = [];

  for (let i = 1; i <= props.years; i++) {
    let rate = props.rate * (1.0 + props.dyn / 100.0) ** (i - 1);

    let eingezahlt = parseFloat(props.start + rate * props.interval * i);
    let eingezahlt_mit_oc = (eingezahlt - (eingezahlt * (props.oc / 100.0))).toFixed(2);

    let growth = (eingezahlt_mit_oc * (1.0 + (props.gr + 0.0) / 100.0) ** i - eingezahlt_mit_oc).toFixed(2) /* 0.0 ist das offset) */
    let portfolio_after_oc = (parseFloat(eingezahlt_mit_oc) + parseFloat(growth)).toFixed(2);

    let dividende = (eingezahlt_mit_oc * (props.dr / 100.0)) * (1.0 + props.divGrowth / 100.0) ** (i - 1);
    
    let dividende_taxes = parseFloat(calculateTaxes(props, dividende));
    let dividende_with_taxes = (dividende - dividende_taxes).toFixed(2);

    let dividende_oc = (dividende_with_taxes * (props.oc / 100.0)).toFixed(2);

    let portfolio_with_dividende = (parseFloat(dividende_with_taxes) - parseFloat(dividende_oc) + parseFloat(portfolio_after_oc)).toFixed(2);

    /*
    Von Brutto dividende müssen noch die Kontoführungsgebüren abgezogen werden.
    */

    table.push(
      <tr key={i}>
        <td>{i}</td>
        <td>{displayNumber(eingezahlt.toFixed(2))}€</td>
        <td>{displayNumber(rate.toFixed(2))}€</td>
        <td>{displayNumber(eingezahlt_mit_oc)}€</td>
        <td>{displayNumber(growth)}€</td>
        <td>{displayNumber(portfolio_after_oc)}€</td>
        <td>{displayNumber(dividende.toFixed(2))}€</td>
        <td>{displayNumber(dividende_taxes.toFixed(2))}€</td>
        <td>{displayNumber(dividende_with_taxes)}€</td>
        <td>{displayNumber(dividende_oc)}€</td>
        <td>{displayNumber(portfolio_with_dividende)}€</td>
      </tr>
    );
    
  }
  return table;
}
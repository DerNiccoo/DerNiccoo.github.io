import React from "react";
import {displayNumber, calculateTaxes} from "../Helper/Helper.js"

export default function ETFTable(props) {
  
  let table = [];
  let dividenden_return = 0;

  for (let i = 1; i <= props.years; i++) {
   
	  //let rate = (valueYE + props.rate) * (1.0 + props.dyn / 100.0) ** (i - 1.0);
    let rate = props.rate * (1.0 + props.dyn / 100.0) ** (i - 1);

    let eingezahlt = parseFloat(props.start + rate * props.interval * i);
    let eingezahltNetto = (eingezahlt - (eingezahlt * (props.oc / 100.0))).toFixed(2);

    let growth = (eingezahltNetto * (1.0 + (props.gr + 0.0) / 100.0) ** i - eingezahltNetto).toFixed(2) /* 0.0 ist das offset) */

    console.log([eingezahltNetto, dividenden_return, growth ])
    //let portfolioNetto = parseFloat(parseFloat(eingezahltNetto) - parseFloat(eingezahltNettoLastYear) + parseFloat(growth) + parseFloat(portfolio_end_of_year)).toFixed(2);
    let portfolioNetto = parseFloat(parseFloat(eingezahltNetto) + parseFloat(growth) + dividenden_return).toFixed(2);
 
    let dividende = (portfolioNetto * (props.dr / 100.0)) * (1.0 + props.divGrowth / 100.0) ** (i - 1);
    
    let dividende_taxes = parseFloat(calculateTaxes(props, dividende));
    let dividendeNetto = (dividende - dividende_taxes).toFixed(2);

    let dividende_oc = (dividendeNetto * (props.oc / 100.0)).toFixed(2);

    let portfolio_end_of_year = (parseFloat(dividendeNetto) - parseFloat(dividende_oc) + parseFloat(portfolioNetto)).toFixed(2);
    dividenden_return = parseFloat(dividendeNetto) - parseFloat(dividende_oc);

    /*
    Von Brutto dividende müssen noch die Kontoführungsgebüren abgezogen werden.
    */

    table.push(
      <tr key={i}>
        <td>{i}</td>
        <td>{displayNumber(eingezahlt.toFixed(2))}€</td>
        <td>{displayNumber(rate.toFixed(2))}€</td>
        <td>{displayNumber(eingezahltNetto)}€</td>
        <td>{displayNumber(growth)}€</td>
        <td>{displayNumber(portfolioNetto)}€</td>
        <td>{displayNumber(dividende.toFixed(2))}€</td>
        <td>{displayNumber(dividende_taxes.toFixed(2))}€</td>
        <td>{displayNumber(dividendeNetto)}€</td>
        <td>{displayNumber(dividende_oc)}€</td>
        <td>{displayNumber(portfolio_end_of_year)}€</td>
      </tr>
    );
    
  }
  return table;
}

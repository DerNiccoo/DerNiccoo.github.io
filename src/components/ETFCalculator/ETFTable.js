import React from "react";
import { displayNumber, calculateTaxes } from "../Helper/Helper.js"

export default function ETFTable(props) {

  let table = [];
  let growth = [];
  let dividenden_return = 0;


  for (let i = 1; i <= props.years; i++) {

    let rate = props.rate * (1.0 + props.dyn / 100.0) ** (i - 1);

    let eingezahlt = props.start + rate * props.interval * i;
    let eingezahltNetto = eingezahlt - (eingezahlt * (props.oc / 100.0));

    let growthSum = growth.reduce((pv, cv) => pv + cv, 0); //Addiert einfach nur alle Werte in der Liste auf

    growth.push((dividenden_return + eingezahltNetto + growthSum) * (props.gr / 100.0));

    growthSum = growth.reduce((pv, cv) => pv + cv, 0);

    let portfolioNetto = eingezahltNetto + growthSum + dividenden_return;

    let divBrutto = portfolioNetto * (props.dr / 100.0);

    let dividende_taxes = calculateTaxes(props, divBrutto);
    let dividendeNetto = divBrutto - dividende_taxes;

    let dividende_oc = dividendeNetto * (props.oc / 100.0);

    let portfolio_end_of_year = dividendeNetto - dividende_oc + portfolioNetto;
    dividenden_return = dividendeNetto - dividende_oc;

    /*
    Von Brutto divBrutto müssen noch die Kontoführungsgebüren abgezogen werden.
    */
    console.log(portfolio_end_of_year);

    table.push(
      <tr key={i}>
        <td>{i}</td>
        <td>{displayNumber(eingezahlt.toFixed(2))}€</td>
        <td>{displayNumber(rate.toFixed(2))}€</td>
        <td>{displayNumber(eingezahltNetto.toFixed(2))}€</td>
        <td>{displayNumber(growth[growth.length - 1].toFixed(2))}€</td>
        <td>{displayNumber(portfolioNetto.toFixed(2))}€</td>
        <td>{displayNumber(divBrutto.toFixed(2))}€</td>
        <td>{displayNumber(dividende_taxes.toFixed(2))}€</td>
        <td>{displayNumber(dividendeNetto.toFixed(2))}€</td>
        <td>{displayNumber(dividende_oc.toFixed(2))}€</td>
        <td>{displayNumber(portfolio_end_of_year.toFixed(2))}€</td>
      </tr>
    );
  }

  return table;
}
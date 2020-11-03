import React from "react";
import { displayNumber, calculateTaxes } from "../Helper/Helper.js"

/*
Experimental version, for testing
*/
export default function ETFTable(props) {

  let table = [];
  let divYear = [];
  let growthFactor = [];
  let divYearPlusGrowth = [];
  let dividenden_return = 0;
  let portfolio_end_of_year = 0;
  let portfolio = 0;

  //portfolio = props.start;

  for (let i = 1; i <= props.years; i++) {


    let rate = props.rate * (1.0 + props.dyn / 100.0) ** (i - 1);
    let rateNetto = rate - (rate * (props.oc / 100.0));

    let eingezahlt = props.start + rate * props.interval * i;
    let eingezahltNetto = eingezahlt - (eingezahlt * (props.oc / 100.0));
    portfolio = (portfolio + eingezahltNetto) * (1 + props.gr / 100) ** i;

    //Dividendenwachstumsformel                             
    if (i === 1) {
      divYear.push((props.start + rateNetto) * (1 + props.dr / 100));
    } else {
      divYear.push((rateNetto) * (1 + props.dr / 100));
    }

    growthFactor.splice(0, 0, (1 + props.dr / 100) ** (i - 1)); //Anstelle etwas zu reversen einfach immer an erster Position einfügen

    let help = 0
    for (let o = 0; o < divYear.length; o++) {
      help += divYear[o] * growthFactor[o]; //In einem loop die Liste zu füllen wobei der Loop auch immer größer wird ist so 0/10
    }
    divYearPlusGrowth.push(help);

    let divBrutto = 0;
    for (let p = 0; p < divYearPlusGrowth.length; p++) {
      divBrutto += divYearPlusGrowth[p];
    }
    //\

    let dividende_taxes = calculateTaxes(props, divBrutto);
    let dividendeNetto = divBrutto - dividende_taxes;

    let dividende_oc = dividendeNetto * (props.oc / 100.0);

    dividenden_return = dividendeNetto - dividende_oc;
    portfolio_end_of_year = dividenden_return + portfolio;

    console.log('%c Jahr ' + i, 'color: orange;')
    console.log({ rate, rateNetto, eingezahlt, eingezahltNetto, portfolio, divYear, growthFactor, divYearPlusGrowth, divBrutto, dividende_taxes, dividendeNetto, dividende_oc, dividenden_return, portfolio_end_of_year })

    /*
    Von Brutto divBrutto müssen noch die Kontoführungsgebüren abgezogen werden.
    */

    table.push(
      <tr key={i}>
        <td>{i}</td>
        <td>{displayNumber(eingezahlt.toFixed(2))}€</td>
        <td>{displayNumber(rate.toFixed(2))}€</td>
        <td>{displayNumber(eingezahltNetto.toFixed(2))}€</td>
        <td>{displayNumber(divYearPlusGrowth[divYearPlusGrowth.length - 1].toFixed(2))}€</td>
        <td>{displayNumber(portfolio.toFixed(2))}€</td>
        <td>{displayNumber(divBrutto.toFixed(2))}€</td>
        <td>{displayNumber(dividende_taxes.toFixed(2))}€</td>
        <td>{displayNumber(dividendeNetto.toFixed(2))}€</td>
        <td>{displayNumber(dividende_oc.toFixed(2))}€</td>
        <td>{displayNumber(portfolio_end_of_year.toFixed(2))}€</td>
      </tr>
    );

    portfolio = portfolio_end_of_year;
  }

  return table;
}

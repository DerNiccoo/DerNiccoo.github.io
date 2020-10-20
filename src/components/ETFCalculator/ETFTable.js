import React from "react";
import {displayNumber, calculateTaxes} from "../Helper/Helper.js"

export default function ETFTable(props) {
  
  let table = [];
  let growth = [];
  let dividenden_return = 0;
  let growthFactor = [];
  let divMem = []; 	                                            //Zwischenspeicher der jeweiligen Dividenden pro Jahr

  for(let p = 1; p <= props.years; p++)                         //Berechnung des Wachstumsfaktor der Dividende(siehe Excel-List), 
  {
    growthFactor.push((1 + props.divGrowth/100)**((p)-1));
  }

  growthFactor.reverse();                                       //Umdrehen der Reihenfolge

  for (let i = 1; i <= props.years; i++) {
   
    let rate = props.rate * (1.0 + props.dyn / 100.0) ** (i - 1);

    let eingezahlt = props.start + rate * props.interval * i;                                   /* Ändern: props.start nur in der ersten eingezahlt Berechnung */
    let eingezahltNetto = eingezahlt - (eingezahlt * (props.oc / 100.0));

    let growthSum = growth.reduce((pv, cv) => pv + cv, 0);

    growth.push((dividenden_return + eingezahltNetto + growthSum) * (props.gr / 100.0)); //eingezahltNetto * (1.0 + (props.gr + 0.0) / 100.0) ** i - eingezahltNetto /* 0.0 ist das offset) */

    growthSum = growth.reduce((pv, cv) => pv + cv, 0);

    let portfolioNetto = eingezahltNetto + growthSum + dividenden_return;
 
    if(i === 1){
      divMem.push((eingezahltNetto + props.start) * (props.dr / 100.0));
	  } 
    else{
      divMem.push((eingezahltNetto) * (props.dr / 100.0));
	  }

    let divBrutto = 0.0;// (portfolioNetto * (props.dr / 100.0)) * (1.0 + props.divGrowth / 100.0) ** (i - 1);

    for(let o = 0; o < i; o++)
    {
      divBrutto += (eingezahltNetto)                                      //Dividende fuer das laufende Jahr
                   * (props.dr / 100.0) + (divMem[o] * growthFactor[o]);  //Dividende für die vergangenden Jahr + divGrowth
    }

    divBrutto = portfolioNetto * (props.dr / 100.0);

    let dividende_taxes = calculateTaxes(props, divBrutto);
    let dividendeNetto = divBrutto - dividende_taxes;

    let dividende_oc = dividendeNetto * (props.oc / 100.0);

    let portfolio_end_of_year = dividendeNetto - dividende_oc + portfolioNetto;
    dividenden_return = dividendeNetto - dividende_oc;

    /*
    Von Brutto divBrutto müssen noch die Kontoführungsgebüren abgezogen werden.
    */

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

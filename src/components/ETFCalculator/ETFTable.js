import React from "react";
import {displayNumber, calculateTaxes} from "../Helper/Helper.js"

export default function ETFTable(props) {
  
  let table = [];
  let dividenden_return = 0;
  let growthFactor = [];
  let divMem = []; 	                                            //Zwischenspeicher der jeweiligen Dividenden pro Jahr

  for(let p = 1; p <= props.years; p++)                         //Berechnung des Wachstumsfaktor der Dividende(siehe Excel-List), 
  {
    growthFactor[p] = (1 + props.divGrowth/100)**((p)-1);
  }

  growthFactor.reverse();                                       //Umdrehen der Reihenfolge

  for (let i = 1; i <= props.years; i++) {
   
    let rate = props.rate * (1.0 + props.dyn / 100.0) ** (i - 1);

    let eingezahlt = parseFloat(props.start + rate * props.interval * i);                                   /* Ändern: props.start nur in der ersten eingezahlt Berechnung */
    let eingezahltNetto = (eingezahlt - (eingezahlt * (props.oc / 100.0))).toFixed(2);

    let growth = (eingezahltNetto * (1.0 + (props.gr + 0.0) / 100.0) ** i - eingezahltNetto).toFixed(2) /* 0.0 ist das offset) */

    let portfolioNetto = parseFloat(parseFloat(eingezahltNetto) + parseFloat(growth) + dividenden_return).toFixed(2);
 
    if(i == 1){
       	divMem[i] = (eingezahltNetto + start) * (props.dr / 100.0);
	} 
    else{
        divMem[i] = (eingezahltNetto) * (props.dr / 100.0);
	}
            
	for(let o = 1; o <= i; o++)
	{
		let divBrutto += (eingezahltNetto)                                      //Dividende fuer das laufende Jahr
                         * (props.dr / 100.0) + (divMem[o] * growthFactor[o]);  //Dividende für die vergangenden Jahr + divGrowth
	}

    let divBrutto = (portfolioNetto * (props.dr / 100.0)) * (1.0 + props.divGrowth / 100.0) ** (i - 1);
    
    let dividende_taxes = parseFloat(calculateTaxes(props, divBrutto));
    let dividendeNetto = (divBrutto - dividende_taxes).toFixed(2);

    let dividende_oc = (dividendeNetto * (props.oc / 100.0)).toFixed(2);

    let portfolio_end_of_year = (parseFloat(dividendeNetto) - parseFloat(dividende_oc) + parseFloat(portfolioNetto)).toFixed(2);
    dividenden_return = parseFloat(dividendeNetto) - parseFloat(dividende_oc);

    /*
    Von Brutto divBrutto müssen noch die Kontoführungsgebüren abgezogen werden.
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

import React from "react";
import {displayNumber, calculateTaxes} from "../Helper/Helper.js"

export default function ETFTable(props) {
  
  let table = [];
  let mem = 0.0;     
  let valueYE = 0.0; 
  let divMem = []; 	 
  let growthFactor = [];
    let inc = 1;

  for(let p = props.years; p >= 1; p--)                         //Berechnung des Wachstumsfaktor der Dividende(siehe Excel-List), 
  {
    growthFactor[inc] = (1 + props.divGrowth/100)**((p)-1);
    inc++;
  }

  for (let i = 1; i <= props.years; i++) {
   
	let rate = (props.rate) * (1.0 + props.dyn / 100.0) ** (i - 1);

    let eingezahlt = parseFloat(props.start + rate * props.interval * i);
    let eingezahltNetto = (eingezahlt - (eingezahlt * (props.oc / 100.0))).toFixed(2);

    let growth = (eingezahltNetto * (1.0 + (props.gr + 0.0) / 100.0) ** i - eingezahltNetto).toFixed(2) /* 0.0 ist das offset) */
    let portfolioNetto = (parseFloat(eingezahltNetto) + parseFloat(growth)).toFixed(2);

	if(i == 1){
       	divMem[i] = (eingezahltNetto + valueYE) * (props.dr / 100.0);
	} 
    else{
        divMem[i] = (eingezahltNetto) * (props.dr / 100.0);
	}
            
	for(let o = 1; o <= i; o++)
	{
		let divBrutto += (eingezahltNetto)                                      //Dividende fuer das laufende Jahr
                         * (props.dr / 100.0) + (divMem[o] * growthFactor[o]);  //Dividende für die vergangenden Jahr + divGrowth
	}
        
    let divTaxes = parseFloat(calculateTaxes(props.taxFree, divBrutto));
    let divNetto = (divBrutto - divTaxes).toFixed(2);

    let divOC = (divNetto * (props.oc / 100.0)).toFixed(2);

    valueYE = (parseFloat(divNetto) - parseFloat(divOC) + parseFloat(portfolioNetto)).toFixed(2);

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
        <td>{displayNumber(growthFactor[i].toFixed(2))}€</td>
        <td>{displayNumber(divBrutto.toFixed(2))}€</td>
        <td>{displayNumber(divTaxes.toFixed(2))}€</td>
        <td>{displayNumber(divNetto)}€</td>
        <td>{displayNumber(divOC)}€</td>
        <td>{displayNumber(valueYE)}€</td>
      </tr>
    );
    
  }
  return table;
}

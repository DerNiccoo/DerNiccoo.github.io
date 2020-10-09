import React from "react";

function calculateInterest(props, i, offset) {
  return (
    props.start +
    props.rate *
      props.interval *
      i *
      (1.0 + (props.dynamic + offset) / 100.0) ** i -
    (props.start + props.rate * props.interval * i)
  ).toFixed(2);
}

function calculateTaxes(props, interest) {
  return interest > props.taxFree
    ? ((interest - props.taxFree) * (props.tax / 100.0)).toFixed(2)
    : 0.0;
}

function calculateNowInterest(props, i, offset) {
  let zinsen = calculateInterest(props, i, offset);
  let taxes = calculateTaxes(props, zinsen);

  let now_interest = (
    (props.start + props.rate * props.interval * i + (zinsen - taxes)) *
    ((props.dynamic + offset) / 100.0)
  ).toFixed(2);
  return (now_interest - calculateTaxes(props, now_interest)).toFixed(2);
}

function displayNumber(number) {
  function reverseString(str) {
    return str.split("").reverse().join("");
  }
  number = String(number);
  number = number.replace(".", ",");

  number = reverseString(number);

  let display = "";
  for (let i = 0; i < number.length; i++) {
    if (i > 5) {
      if ((i - 6) % 3 === 0) {
        display += ".";
      }
    }
    display += number.charAt(i);
  }
  return reverseString(display);
}

export default function compoundInterest(props) {
  let table = [];
  for (let i = 0; i < props.years; i++) {
    let zinsen = calculateInterest(props, i, 0);
    let taxes = calculateTaxes(props, zinsen);

    let zinsen_low = calculateInterest(props, i, -2.0);
    let taxes_low = calculateTaxes(props, zinsen_low);
    let zinsen_high = calculateInterest(props, i, 2.0);
    let taxes_high = calculateTaxes(props, zinsen_high);

    let now_interest = calculateNowInterest(props, i, 0.0);

    table.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <td>
          {displayNumber(
            (props.start + props.rate * props.interval * i).toFixed(2)
          )}
          €
        </td>
        <td>{displayNumber(now_interest)}€</td>
        <td>
          {displayNumber(
            (
              props.start +
              props.rate * props.interval * i +
              (zinsen - taxes)
            ).toFixed(2)
          )}
          €
        </td>
        <td>{displayNumber(zinsen)}€</td>
        <td>{displayNumber(taxes)}€</td>
        <td>{displayNumber((zinsen - taxes).toFixed(2))}€</td>
        <td>
          {displayNumber(
            (
              props.start +
              props.rate * props.interval * i +
              (zinsen_low - taxes_low)
            ).toFixed(2)
          )}
          €
        </td>
        <td>{displayNumber((zinsen_low - taxes_low).toFixed(2))}€</td>
        <td>
          {displayNumber(
            (
              props.start +
              props.rate * props.interval * i +
              (zinsen_high - taxes_high)
            ).toFixed(2)
          )}
          €
        </td>
        <td>{displayNumber((zinsen_high - taxes_high).toFixed(2))}€</td>
      </tr>
    );
  }

  return table;
}

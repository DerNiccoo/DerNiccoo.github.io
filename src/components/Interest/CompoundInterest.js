import React from "react";

export default function compoundInterest(props) {
  let table = [];
  for (let i = 0; i < props.years; i++) {
    let zinsen = (
      props.start +
      props.rate * props.interval * i * (1.0 + props.dynamic / 100.0) ** i -
      (props.start + props.rate * props.interval * i)
    ).toFixed(2);
    let taxes =
      zinsen > props.taxFree
        ? ((zinsen - props.taxFree) * (props.tax / 100.0)).toFixed(2)
        : zinsen;

    table.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{(props.start + props.rate * props.interval * i).toFixed(2)}€</td>
        <td>{zinsen}€</td>
        <td>
          {(
            props.start +
            props.rate * props.interval * i * (1.0 + props.dynamic / 100.0) ** i
          ).toFixed(2)}
          €
        </td>
        <td>{zinsen}€</td>
        <td>{taxes}€</td>
        <td>{(zinsen - taxes).toFixed(2)}€</td>
        <td>
          {(
            props.start +
            props.rate *
              props.interval *
              i *
              (1.0 + (props.dynamic - 2.0) / 100.0) ** i
          ).toFixed(2)}
          €
        </td>
        <td>
          {(
            props.start +
            props.rate *
              props.interval *
              i *
              (1.0 + (props.dynamic - 2.0) / 100.0) ** i -
            (props.start + props.rate * props.interval * i)
          ).toFixed(2)}
          €
        </td>
        <td>
          {(
            props.start +
            props.rate *
              props.interval *
              i *
              (1.0 + (props.dynamic + 2.0) / 100.0) ** i
          ).toFixed(2)}
          €
        </td>
        <td>
          {(
            props.start +
            props.rate *
              props.interval *
              i *
              (1.0 + (props.dynamic + 2.0) / 100.0) ** i -
            (props.start + props.rate * props.interval * i)
          ).toFixed(2)}
          €
        </td>
      </tr>
    );
  }

  return table;
}

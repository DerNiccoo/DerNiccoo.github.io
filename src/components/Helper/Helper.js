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

function calculateTaxes(props, total) {
  return total > props.taxFree
    ? ((total - props.taxFree) * (props.tax / 100.0)).toFixed(2)
    : 0.0;
}

export {displayNumber, calculateTaxes}
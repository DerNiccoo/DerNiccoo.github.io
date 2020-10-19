/**
 * Formats the float numbers to better readable numbers that should be used for every displayed number. 
 * The input number should have 2-digits after the decimal comma or else it wont work.
 * 
 * First the string get replaced with a comma as a split character. After that the number gets reversed to place the decimal dot after every 3 characters.
 * @param {*} number 
 */
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

/**
 * Calculates the amount of taxes that should be paied on the given amount. 
 * 
 * For an easier use in the calculator methods, it takes the props container with the values tax (rate in %) and taxFree (amount of untaxed money)
 * 
 */
function calculateTaxes(props, total) {
  return total > props.taxFree
    ? ((total - props.taxFree) * (props.tax / 100.0)).toFixed(2)
    : 0.0;
}

export {displayNumber, calculateTaxes}